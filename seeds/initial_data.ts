import * as Knex from "knex";
import * as fs from 'fs';
import * as path from "path";

export async function seed(knex: Knex): Promise<any> {

    await knex('article_comment').del();
    await knex('article_tag').del();
    await knex('history').del();
    await knex('bookmark').del();
    await knex('article').del();
    await knex('tag').del();
    await knex('follower').del();
    await knex('user').del();
    await knex('searching_key').del();

    const [raviId, lexieId, matthewId] = await knex('user').insert([
        { name: 'Ravi', password: '1234', email: "ravitsang@gmail.com", link: 'https://www.facebook.com/ravi.tsang' },
        { name: 'Lexie', password: '1234', email: "lexingtonc852@gmail.com", link: 'https://www.facebook.com/ravi.tsang' },
        { name: 'Matthew', password: '1234', email: "matthewchoi123@gmail.com", link: 'https://www.facebook.com/ravi.tsang' }
    ]).returning('id');

    await knex('follower').insert([
        { user_id: raviId, followed_by_id: lexieId },
        { user_id: raviId, followed_by_id: matthewId },
        { user_id: lexieId, followed_by_id: raviId }
    ]).returning('id');

    await knex('searching_key').insert([
        { name: 'how to web scrape' },
        { name: 'what is programming' }
    ]).returning('id');

    const tag_ids = await knex('tag').insert([
        { name: 'Life' },
        { name: 'Marketing' },
        { name: 'Sneaker' }
    ]).returning('id');

    
    let html = await fs.promises.readFile(path.join(__dirname,'../test_md/test3.md'));

    const article_ids = await knex('article').insert([
        { title: '# How to Scrape Data from Web Pages for Sentiment Analysis?', content: `${html}`, reading_time: 4, user_id: raviId },
        { title: '# How to Scrape Data from Web Pages', content: "- [Scrapy](https://scrapy.org/)", reading_time: 4, user_id: lexieId },
        { title: '# Get the request', content: "[** **requests](https://2.python-requests.org/en/master/).", reading_time: 4, user_id: lexieId },
        { title: '# Extract the data from the website', content: "**Make a request (1),", reading_time: 4, user_id: matthewId }
    ]).returning('id');

    await knex('bookmark').insert([
        { user_id: lexieId, article_id: article_ids[0] },
        { user_id: raviId, article_id: article_ids[1] },
        { user_id: raviId, article_id: article_ids[2] },
        { user_id: raviId, article_id: article_ids[3] },
        { user_id: matthewId, article_id: article_ids[1] },
        { user_id: matthewId, article_id: article_ids[2] }
    ]).returning('id');

    await knex('history').insert([
        { user_id: lexieId, article_id: article_ids[0], clap: 50 },
        { user_id: lexieId, article_id: article_ids[1], clap: 1 },
        { user_id: raviId, article_id: article_ids[1], clap: 10 },
        { user_id: raviId, article_id: article_ids[2], clap: 10 },
        { user_id: raviId, article_id: article_ids[3], clap: 50 },
        { user_id: matthewId, article_id: article_ids[0]},
        { user_id: matthewId, article_id: article_ids[1], clap: 5 },
        { user_id: matthewId, article_id: article_ids[2], clap: 10 }
    ]).returning('id');

    await knex('article_tag').insert([
        { article_id: article_ids[0], tag_id: tag_ids[0] },
        { article_id: article_ids[1], tag_id: tag_ids[1] },
        { article_id: article_ids[2], tag_id: tag_ids[1] },
        { article_id: article_ids[3], tag_id: tag_ids[0] },
        { article_id: article_ids[3], tag_id: tag_ids[1] },
        { article_id: article_ids[3], tag_id: tag_ids[2] }
    ]).returning('id');

    await knex('article_comment').insert([
        { user_id: lexieId, article_id: article_ids[0], comment: "Nice article!!" },
        { user_id: raviId, article_id: article_ids[3], comment: "Thanks for sharing!" },
        { user_id: matthewId, article_id: article_ids[1], comment: "Well Done!" }
    ]).returning('id');
};
