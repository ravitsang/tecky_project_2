import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('article',table =>{
        table.boolean("delete").defaultTo(false);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('article',table =>{
        table.dropColumn("delete");
    })
}

