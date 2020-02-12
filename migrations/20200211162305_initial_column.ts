import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {

    await knex.schema.createTable('searching_key',table =>{
        table.increments();
        table.string('name');
        table.timestamps(false, true);
    })
    await knex.schema.createTable('user',table =>{
        table.increments();
        table.string('name').notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
        table.text('link');
        table.text('photo');
        table.boolean('membership').defaultTo(false);
        table.timestamps(false, true);
    })
    await knex.schema.createTable('follower',table =>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id')
        table.integer("followed_by_id").unsigned();
        table.foreign('followed_by_id').references('user.id')
        table.timestamps(false, true);
    })
    await knex.schema.createTable('tag',table =>{
        table.increments();
        table.string('name').unique();
        table.timestamps(false, true);
    })
    await knex.schema.createTable('article',table =>{
        table.increments()
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.integer('reading_time').notNullable();
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id');
        table.timestamps(false, true);
    })
    await knex.schema.createTable('bookmark',table =>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id')
        table.integer("article_id").unsigned();
        table.foreign('article_id').references('article.id')
        table.timestamps(false, true);
    })
    await knex.schema.createTable('history',table =>{
        table.increments();
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id')
        table.integer("article_id").unsigned();
        table.foreign('article_id').references('article.id')
        table.integer("clap").defaultTo(0);
        table.timestamps(false, true);
    })
    await knex.schema.createTable('article_tag',table =>{
        table.increments()
        table.integer("article_id").unsigned();
        table.foreign('article_id').references('article.id')
        table.integer("tag_id").unsigned();
        table.foreign('tag_id').references('tag.id');
        table.timestamps(false, true);
    })
    await knex.schema.createTable('article_comment',table =>{
        table.increments()
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('user.id')
        table.integer("article_id").unsigned();
        table.foreign('article_id').references('article.id')
        table.text('comment')
        table.timestamps(false,true);
    })

}


export async function down(knex: Knex): Promise<any> {

    await knex.schema.dropTable('article_comment');
    await knex.schema.dropTable('article_tag');
    await knex.schema.dropTable('history');
    await knex.schema.dropTable('bookmark');
    await knex.schema.dropTable('article');
    await knex.schema.dropTable('tag');
    await knex.schema.dropTable('follower');
    await knex.schema.dropTable('user');
    await knex.schema.dropTable('searching_key');

}

