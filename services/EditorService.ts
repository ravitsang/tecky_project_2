import * as Knex from 'knex';
import { Article } from './models';

export class EditorService{
    constructor(private knex:Knex){

    }

    async create(article:Article){
        const result = await this.knex.raw(`INSERT INTO "article" (
            content
        ) VALUES (

            :content
        ) RETURNING id`,{
            content: article.content
        })
        return result.rows[0].id
    }

    async retrieve(){
        const result = await this.knex.raw(`SELECT * FROM "article"`);
        return result.rows
    }
}