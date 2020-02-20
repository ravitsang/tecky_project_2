import * as Knex from 'knex';
import { EditorService } from './EditorService';
const knexfile = require('../knexfile'); 
const knex = Knex(knexfile["testing"]); 

describe('test EditorService',()=>{
    beforeAll(async()=>{
        await knex.migrate.latest();
        await knex.raw(`DELETE FROM "bookmark"`);
        await knex.raw(`DELETE FROM "article"`);
        await knex.seed.run();
    })

    it('test editor service get correctly',async()=>{
        await knex.transaction(async trx=>{
            const service = new EditorService(trx);
            const articles = await service.retrieve();
            expect(articles.length).toBe(4)
        })
    })

    afterAll(async()=>{
        await knex.destroy();
    })
})