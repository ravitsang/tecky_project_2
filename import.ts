import { Tag, ImportArticle } from './model/importCsvModel';
import * as Knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';

// promise version to read csv file
import * as neatCsv from 'neat-csv';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig['development']);


//  xlsx vs excel ?
// .returning('id') is knex builder syntax
//  id = result.rows[0].id
// create tagMap = {} for getting the id 
// delete data with descending order
// shift + options to select more than one column


async function importData() {

    // const tagCsv = await fs.promises.readFile(path.join(__dirname, "scrape_medium/data/medium_tag.csv"));
    // let tags: Tag[] = await neatCsv(tagCsv);


    const articleCsv = await fs.promises.readFile(path.join(__dirname, './scrape_medium/data/medium_article.csv'));
    let articleDetails: ImportArticle[] = await neatCsv(articleCsv);

    // console.log(articleDetails);


    try {
        await knex.transaction(async trx => {

            let authorList: string[] = [];
            let tagList: string[] = [];
            let tagMap = {};
            // insert users

            // delete all data first

            await trx.raw(/*sql */ `DELETE FROM "article_comment"`)
            await trx.raw(/*sql */ `DELETE FROM "article_tag"`)
            await trx.raw(/*sql */ `DELETE FROM "history"`)
            await trx.raw(/*sql */ `DELETE FROM "bookmark"`)
            await trx.raw(/*sql */ `DELETE FROM "article"`)
            await trx.raw(/*sql */ `DELETE FROM "tag"`)
            await trx.raw(/*sql */ `DELETE FROM "follower"`)
            await trx.raw(/*sql */ `DELETE FROM "user"`)
            await trx.raw(/*sql */ `DELETE FROM "searching_key"`)


            for (let articleDetail of articleDetails) {

                if (authorList.indexOf(articleDetail.author) !== -1 || articleDetail.author === "") {
                    continue;
                }

                authorList.push(articleDetail.author)
                // console.log(authorList);
                const username = articleDetail.author.toLowerCase().split(' ').join("");

                const userResult = await trx.raw(/*sql*/`
                    INSERT INTO "user"("name", "password", "email")
                        VALUES(:name, :password, :email) RETURNING id`,
                    {
                        name: username,
                        password: '1234',
                        email: `${username}@gmail.com`
                    })

                const articleResult = await trx.raw(/*sql*/`
                    INSERT INTO "article"("title", "content", "reading_time", "user_id")
                        VALUES(:title, :content, :reading_time, :user_id) RETURNING id`,
                    {
                        title: articleDetail.title,
                        content: articleDetail.content,
                        reading_time: 4,
                        user_id: userResult.rows[0].id
                    })

                console.log(articleDetail.tag);
                const tags = articleDetail.tag.split(',');
                console.log(tags);
                for (let tag of tags) {

                    // if the tag cannot find from tagList, insert the tag
                    if (tagList.indexOf(tag) === -1) {

                        tagList.push(tag)

                        console.log(tag);
                        const tagResult = await trx.raw(/* sql */ `
                            INSERT INTO "tag" ("name")
                                VALUES(:name) RETURNING id`,
                            {
                                name: tag
                            })
                        console.log(tagResult);
                        tagMap[tag] = tagResult.rows[0].id;
                    }
                    console.log(tagList);
                    await trx.raw(/* sql */ `
                        INSERT INTO "article_tag" ("article_id","tag_id")
                            VALUES(:article_id,:tag_id)`,
                        {
                            article_id: articleResult.rows[0].id,
                            tag_id: tagMap[tag]
                        })

                }
            }
            // await trx.rollback();

        })

    } catch (e) {
        console.log(e);
    }

    await knex.destroy();

}


importData();