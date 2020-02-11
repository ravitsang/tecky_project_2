import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {

    await knex.schema.createTable('searching_key',table =>{
        table.increments();
        table.string('name');
    })
    await knex.schema.createTable('user',table =>{
        table.increments();
        table.string('name').notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable();


        

    })
}


export async function down(knex: Knex): Promise<any> {
}

