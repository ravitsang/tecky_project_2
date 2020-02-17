import * as Knex from "knex";
import { Article } from "./models";
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig[process.env.NODE_END || 'development'])

// class instance write as function declaration? not expression?
// when use transaction?
export class ArticleService {

    constructor() {

    }

    // create article
    async create(article: Article, user_id: number) {
        const articleResult = await knex.raw(/*sql*/`
            INSERT INTO "article" ("user_id","title","content","reading_time")
            VALUES (:user_id, :title, :content, :reading_time) RETURNING id`,
            {
                user_id: user_id,
                title: article.title,
                content: article.content,
                reading_time: 4
            })
        return (articleResult.rows[0].id);
    }

    // retrieve an article of a user
    async retrieve(article_id: number) {
        const article = await knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE id = :article_id`,
                {
                    article_id: article_id
                }) 
        return article;


    }
    
    // retrieve all articles of a user
    async retrieveAll(user_id: number) {
        const articles = await knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE user_id = :user_id`,
                {
                    user_id:user_id
                }) 
        return articles;


    }

    // update article
    async update(article:Article ,article_id: number) {
        await knex.raw(/*sql*/`
            UPDATE "article"
                SET ("user_id" = :user_id,"title" = :title,"content" = :content,"reading_time" = :reading_time)
                WHERE article.id = :article_id `,
                {
                    user_id: article_id,
                    title: article.title,
                    content: article.content,
                    reading_time: 4

                }) 

    }
    // delete article
    async delete() {
        await knex.raw(/*sql*/`
            UPDATE "article"
                SET ("delete" = :delete)
                WHERE article.id = :article_id `,
                {
                    delete: true
                }) 

    }
}