import * as Knex from "knex";
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig[process.env.NODE_END || 'development'])

export class SearchService {

    constructor() {

    }



    //search Tag
    async searchTag(query: string) {
        const tagResult = await knex.raw(`SELECT name FROM "tag" WHERE to_tsvector(name) @@ plainto_tsquery('${query}');`)
        if (tagResult.rows.length > 0) {
            return tagResult.rows;
        } else {
            return null;
        }

    }


    //search User
    async searchUser(query: string) {
        const userResult = await knex.raw(`SELECT name FROM "user" WHERE to_tsvector(name) @@ plainto_tsquery('${query}');`)
        if (userResult.rows.length > 0) {
            return userResult.rows;
        } else {
            return null;
        }

    }

    //search Article
    async searchArticle(query: string) {
        const articleResult = await knex.raw(`SELECT * FROM "article" WHERE title ilike ? `,["%"+query+"%"]);
        // const articleResult = await knex.raw(`SELECT * FROM "article" WHERE to_tsvector(title) @@ plainto_tsquery('${query}');`)
        if (articleResult.rows.length > 0) {
            return articleResult.rows;
        } else {
            return null;
        }
    }






}

