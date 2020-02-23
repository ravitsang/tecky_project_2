import * as Knex from 'knex';

export class EditorService{
    constructor(private knex:Knex){

    }

    async create(title:string,content:string,userId:number,photo:string){
        const result = await this.knex.raw(`INSERT INTO "article" (
            "user_id",
            "title",
            "content",
            "reading_time",
            "photo"
        ) VALUES (
            :user_id,
            :title,
            :content,
            :reading_time,
            :photo
        ) RETURNING id`,{
            user_id: userId,
            title: title,
            content: content,
            reading_time: 4,
            photo:photo
        })
        return result.rows[0].id
    }

    async retrieve(){
        const result = await this.knex.raw(`SELECT * FROM "article"`);
        return result.rows
    }
}