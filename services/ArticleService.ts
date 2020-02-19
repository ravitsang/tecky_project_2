import * as Knex from "knex";
import { Article } from "./models";


// const knexConfig = require('../knexfile');
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])



export class ArticleService {

    constructor(private knex: Knex) {

    }


    // create article
    async create(article: Article, userId: number) {
        await this.knex.transaction(async trx => {

            const articleResult = await trx.raw(/*sql*/`
                INSERT INTO "article" ("user_id","title","content","reading_time")
                VALUES (:user_id, :title, :content, :reading_time) RETURNING id`,
                {
                    user_id: userId,
                    title: article.title,
                    content: article.content,
                    reading_time: 4
                })


            return (articleResult.rows[0].id);

        })

        await this.knex.destroy();
    }



    // retrieve an article of a user
    async retrieve(article_id: number) {
        const article = await this.knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE id = :article_id`,
            {
                article_id: article_id
            })
        return article;


    }



    // retrieve all articles of a user
    async retrieveAll(user_id: number) {
        const articles = await this.knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE user_id = :user_id`,
            {
                user_id: user_id
            })
        return articles;


    }


    // tag
    async retrieveTagArticle(userId:number) {
        const articles = await this.knex.raw(/*sql*/`
            SELECT title, content, tag.name as tag_name, "user".id FROM "article"
                JOIN "user" on "user".id = article.user_id
                JOIN "tag_user" on tag_user.user_id = "user".id
                JOIN "tag" on tag_user.tag_id = tag.id
                WHERE "user".id = ${userId}
               `)

        return articles;


    }


    // update article
    async update(article: Article, article_id: number) {
        await this.knex.transaction(async trx => {

            await trx.raw(/*sql*/`
                UPDATE "article"
                    SET ("user_id" = :user_id,"title" = :title,"content" = :content,"reading_time" = :reading_time)
                    WHERE article.id = :article_id `,
                {
                    user_id: article_id,
                    title: article.title,
                    content: article.content,
                    reading_time: 4

                })


        })

        await this.knex.destroy();

    }


    // delete article
    async delete() {

        await this.knex.transaction(async trx => {

            await trx.raw(/*sql*/`
                UPDATE "article"
                    SET ("delete" = :delete)
                    WHERE article.id = :article_id `,
                {
                    delete: true
                })
        })

        await this.knex.destroy();
    }
}

// const articleService = new ArticleService(knex);

// async function test(userId:number){
//     const result = await articleService.retrieveTagArticle(userId);
//     console.log(result);
// }

// test(492)