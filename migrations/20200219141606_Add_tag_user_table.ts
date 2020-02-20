import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('tag_user',table =>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id');
        table.integer("tag_id").unsigned();
        table.foreign('tag_id').references('tag.id');
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('tag_user');
    
}

