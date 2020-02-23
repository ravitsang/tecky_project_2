import * as Knex from "knex";
import * as fs from 'fs';
import * as path from "path";
import * as neatCsv from 'neat-csv';
import { ImportArticle } from '../model/importCsvModel';

export async function seed(knex: Knex): Promise<any> {

    await knex('article_comment').del();
    await knex('article_tag').del();
    await knex('history').del();
    await knex('bookmark').del();
    await knex('article').del();
    await knex('tag_user').del();
    await knex('tag').del();
    await knex('follower').del();
    await knex('user').del();
    await knex('searching_key').del();

    const [raviId, lexieId, matthewId] = await knex('user').insert([
        { name: 'Ravi', password: '$2a$10$fC2s35gIiqDYbciSitrtt.IIdkRZvOHsngyW.Wo9AqatuxK7S5jsK', email: "14225425@life.hkbu.edu.hk", link: 'https://www.facebook.com/ravi.tsang' },
        { name: 'Lexie', password: '$2a$10$Tkb5Nko/AJMAs4NTNZR9U.x7NyH26/JVxxgZCVpWI2qgQnMvXt4rS', email: "lexingtonc852@gmail.com", link: 'https://www.facebook.com/ravi.tsang' },
        { name: 'Matthew', password: '$2a$10$Tkb5Nko/AJMAs4NTNZR9U.x7NyH26/JVxxgZCVpWI2qgQnMvXt4rS', email: "matthewchoi123@gmail.com", link: 'https://www.facebook.com/ravi.tsang' }
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
        { name: 'Sneaker' },
        { name: 'Programming' },
    ]).returning('id');

    
    const articleCsv = await fs.promises.readFile(path.join(__dirname, '../scrape_medium/data/medium_article.csv'));
    let articleDetails: ImportArticle[] = await neatCsv(articleCsv);

    const photo = []
    for (let index = 0; index < 16; index++) {
        photo.push(articleDetails[index].content.split('</noscript>')[0].split('<noscript>')[1]);
    }
 
    

    const article_ids = await knex('article').insert([
        { title: `${articleDetails[0].title}`, content: `${articleDetails[0].content}`, reading_time: 4, user_id: raviId, photo: photo[0]},
        { title: `${articleDetails[1].title}`, content: `${articleDetails[1].content}`, reading_time: 4, user_id: raviId, photo: photo[1]},
        { title: `${articleDetails[2].title}`, content: `${articleDetails[2].content}`, reading_time: 4, user_id: raviId, photo: photo[2]},
        { title: `${articleDetails[3].title}`, content: `${articleDetails[3].content}`, reading_time: 4, user_id: raviId, photo: photo[3]},
        { title: `${articleDetails[4].title}`, content: `${articleDetails[4].content}`, reading_time: 4, user_id: matthewId, photo: photo[4]},
        { title: `${articleDetails[5].title}`, content: `${articleDetails[5].content}`, reading_time: 4, user_id: matthewId, photo: photo[5]},
        { title: `${articleDetails[6].title}`, content: `${articleDetails[6].content}`, reading_time: 4, user_id: matthewId, photo: photo[6]},
        { title: `${articleDetails[7].title}`, content: `${articleDetails[7].content}`, reading_time: 4, user_id: matthewId, photo: photo[7]},
        { title: `${articleDetails[8].title}`, content: `${articleDetails[8].content}`, reading_time: 4, user_id: matthewId, photo: photo[8]},
        { title: `${articleDetails[9].title}`, content: `${articleDetails[9].content}`, reading_time: 4, user_id: matthewId, photo: photo[9]},
        { title: `${articleDetails[10].title}`, content: `${articleDetails[10].content}`, reading_time: 4, user_id: lexieId, photo: photo[10]},
        { title: `${articleDetails[11].title}`, content: `${articleDetails[11].content}`, reading_time: 4, user_id: lexieId, photo: photo[11]},
        { title: `${articleDetails[12].title}`, content: `${articleDetails[12].content}`, reading_time: 4, user_id: lexieId, photo: photo[12]},
        { title: `${articleDetails[13].title}`, content: `${articleDetails[13].content}`, reading_time: 4, user_id: lexieId, photo: photo[13]},
        { title: `${articleDetails[14].title}`, content: `${articleDetails[14].content}`, reading_time: 4, user_id: lexieId, photo: photo[14]}
    ]).returning('id')

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
        { article_id: article_ids[0], tag_id: tag_ids[3] },
        { article_id: article_ids[1], tag_id: tag_ids[3] },
        { article_id: article_ids[2], tag_id: tag_ids[3] },
        { article_id: article_ids[3], tag_id: tag_ids[3] },
        { article_id: article_ids[4], tag_id: tag_ids[3] },
        { article_id: article_ids[5], tag_id: tag_ids[3] },
        { article_id: article_ids[6], tag_id: tag_ids[3] },
        { article_id: article_ids[7], tag_id: tag_ids[3] },
        { article_id: article_ids[8], tag_id: tag_ids[3] },
        { article_id: article_ids[9], tag_id: tag_ids[3] },
        { article_id: article_ids[10], tag_id: tag_ids[3] },
        { article_id: article_ids[11], tag_id: tag_ids[3] },
        { article_id: article_ids[12], tag_id: tag_ids[3] },
        { article_id: article_ids[13], tag_id: tag_ids[0] },
        { article_id: article_ids[14], tag_id: tag_ids[1] },
        { article_id: article_ids[15], tag_id: tag_ids[2] }
    ]).returning('id')


    await knex('article_comment').insert([
        { user_id: lexieId, article_id: article_ids[0], comment: "Nice article!!" },
        { user_id: raviId, article_id: article_ids[3], comment: "Thanks for sharing!" },
        { user_id: matthewId, article_id: article_ids[1], comment: "Well Done!" }
    ]).returning('id');

    await knex('tag_user').insert([
        { user_id: raviId, tag_id: tag_ids[0] },
        { user_id: raviId, tag_id: tag_ids[3] },
        { user_id: lexieId, tag_id: tag_ids[0] },
        { user_id: lexieId, tag_id: tag_ids[1] },
        { user_id: matthewId, tag_id: tag_ids[0] },
        { user_id: matthewId, tag_id: tag_ids[3] }
    ]).returning('id');
    
};
