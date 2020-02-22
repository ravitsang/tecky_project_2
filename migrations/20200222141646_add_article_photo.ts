import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('article', table => {
        table.text("photo")
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('article', table => {
        table.dropColumn("photo");
    })
}

