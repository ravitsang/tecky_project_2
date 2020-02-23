import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('bookmark', table => {
        table.boolean('delete').defaultTo(false);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('bookmark', table => {
        table.dropColumn('delete')
    })
}

