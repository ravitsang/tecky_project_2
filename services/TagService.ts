import * as Knex from "knex";




export class TagService {

    constructor(private knex: Knex) {

    }
    
    async create(article_id: number) {

        await this.knex.transaction(async trx => {

            const article = await this.knex.raw(/*sql*/`
                SELECT * FROM "article"
                    WHERE id = :article_id`,
                {
                    article_id: article_id
                })
            return article;
            })
        
        await this.knex.destroy();

    }

    async retrieve(articleTags: string[] | string ) {

        
        const article = await this.knex.raw(/*sql*/`
            SELECT * FROM "article"
                WHERE id = :article_id`,
            {
                article_id: article_id
            })
        return article;


    }
    



}