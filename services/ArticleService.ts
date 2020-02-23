import * as Knex from "knex";
// import { Article } from "./models";


// const knexConfig = require('../knexfile');
// const knex = Knex(knexConfig["development"])



export class ArticleService {

    constructor(private knex: Knex) {

    }


    // // create article
    // async create(article: Article, userId: number) {
    //     await this.knex.transaction(async trx => {

    //         const articleResult = await trx.raw(/*sql*/`
    //             INSERT INTO "article" ("user_id","title","content","reading_time")
    //             VALUES (:user_id, :title, :content, :reading_time) RETURNING id`,
    //             {
    //                 user_id: userId,
    //                 title: article.title,
    //                 content: article.content,
    //                 reading_time: 4
    //             })


    //         return (articleResult.rows[0].id);

    //     })

    //     await this.knex.destroy();
    // }



    // retrieve an article of a user
    async retrieve(articleId: number) {
        const articleResult = await this.knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE article.id = :article_id`,
            {
                article_id: articleId
            })
        // console.log(articleResult.rows);
        // console.log(articleResult.rows);
        return articleResult.rows;


    }

    async getAuthorName(articleId: number) {
        const authorNameResult = await this.knex.raw(/*sql*/`
            SELECT "user".name, "user".photo FROM "article"
                JOIN "user" on "user".id = article.user_id
                WHERE article.id = :article_id`,
            {
                article_id: articleId
            })
        // console.log({ authorNameResult: authorNameResult.rows[0].name });
        return {
            authorName: authorNameResult.rows[0].name,
            authorPhoto: authorNameResult.rows[0].photo
        };


    }



    // retrieve all articles of a user
    // async retrieveAll(user_id: number) {
    //     const articles = await this.knex.raw(/*sql*/`
    //         SELECT * FROM "article"
    //             WHERE user_id = :user_id`,
    //         {
    //             user_id: user_id
    //         })
    //     return articles;


    // }

    async getUserTagName(userId: number) {
        let tags = [];
        const tagNameResult = await this.knex.raw(/*sql*/`
            SELECT * FROM "tag_user"
                JOIN "user" on "user".id = tag_user.user_id
                JOIN "tag" on tag.id = tag_user.tag_id
                WHERE "user".id = ${userId}`
        )
        for (const tag of tagNameResult.rows) {
            tags.push(tag.name)
        }

        return tags;


    }

    //  SELECT * FROM "article" JOIN "user" on "user".id = article.user_id JOIN "tag_user" on tag_user.user_id = "user".id JOIN "tag" on tag_user.tag_id = tag.id

    async getTagsArticle(tag: string) {

        const articles = await this.knex.raw(/*sql*/`
            SELECT article.title, "user".id as author_id, tag.name as tag_name, article.created_at , article.id as article_id, article.photo FROM article
                JOIN "user" on "user".id = article.user_id
                JOIN "article_tag" on article_tag.article_id = article.id
                JOIN "tag" on tag.id = article_tag.tag_id
                WHERE tag.name = :tagName `,
            {
                tagName: tag
            })


        let articleResult = await articles.rows;

        // console.log({articleResult:articleResult});


        let index = 0;
        for (let article of articleResult) {

            const authorId = await article.author_id;

            const authorNameResult = await this.knex.raw(/*sql*/`
                SELECT name FROM "user"
                    WHERE "user".id = ${authorId} 
                    `)

            const authorName = await authorNameResult.rows[0].name

            articleResult[index].author_name = authorName;
            index++;

        }

        // console.log({articleResult:articleResult});
        // console.log(articleResult);
        return articleResult;
        // return {articles:articles , authorNames: authorName};


    }


    async isBookmarkExist(articleId: number, userId: number) {


        const result = await this.knex.raw(/*sql*/`
        SELECT * FROM "bookmark"
            WHERE ("article_id" = :article_id AND "user_id" = :user_id)`,
            {
                article_id: articleId,
                user_id: userId
            }
        )
        console.log({result:result.length});

        if (result.rows.length === 0){
            return false
        }else{
            return true
        }

    }


    async addBookmark(articleId: number, userId: number) {

        try {
            await this.knex.transaction(async trx => {

                await trx.raw(/*sql*/`
                    INSERT INTO "bookmark" ("user_id", "article_id")
                        VALUES (:userId, :articleId)`,
                    {
                        userId: userId,
                        articleId: articleId
                    })

                // console.log({ result: result.rows });
            })

            await this.knex.destroy();

            return true
        } catch (e) {

            console.log(e);
            return false
        }

    }

    async editBookmarkStatus(articleId: number, userId: number, bookmarked: string) {


        const deleteResult = await this.knex.raw(/*sql*/`
        UPDATE "bookmark"
            SET ("delete" = :delete_data)
            WHERE "article_id" = :article_id AND "user_id" = :user_id`,
            {
                user_id: userId,
                article_id: articleId,
                delete_data: true
            }
        )

        console.log({ deleteResult: deleteResult.rows });
    }

    // update article
    //     async update(article: Article, article_id: number) {
    //         await this.knex.transaction(async trx => {

    //             await trx.raw(/*sql*/`
    //                 UPDATE "article"
    //                     SET ("user_id" = :user_id,"title" = :title,"content" = :content,"reading_time" = :reading_time)
    //                     WHERE article.id = :article_id `,
    //                 {
    //                     user_id: article_id,
    //                     title: article.title,
    //                     content: article.content,
    //                     reading_time: 4

    //                 })


    //         })

    //     await this.knex.destroy();

    // }


    //     // delete article
    //     async delete() {

    //         await this.knex.transaction(async trx => {

    //             await trx.raw(/*sql*/`
    //                 UPDATE "article"
    //                     SET ("delete" = :delete)
    //                     WHERE article.id = :article_id `,
    //                 {
    //                     delete: true
    //                 })
    //         })

    //         await this.knex.destroy();
    //     }
}

// const articleService = new ArticleService(knex);

// async function test(userId:number){
//     const result = await articleService.retrieveTagArticle(userId);
//     console.log(result);
// }

// test(509)
