// import * as Knex from 'knex';
import * as fs from 'fs';

import * as path from 'path';
// promise version to read csv file
import * as neatCsv from 'neat-csv';

// const knexConfig = require('./knexfile');
// const knex = Knex(knexConfig['development']);


//  xlsx vs execel ?

async function importData() {

    // const index = 1;
    
    // while (index < 39){
        
        
    //     // let content = await fs.promises.readFile(path.join(__dirname,`./scrape_medium/scrape_content/content_${index}`));
        
    //     // let article_tags = await fs.promises.readFile(path.join(__dirname,"scrape_medium/data/medium_tag.csv"));
        
    // }
    const csv = await fs.promises.readFile(path.join(__dirname,'./scrape_medium/data/medium_article.csv'));

    let article_details = await neatCsv(csv)
    console.log(article_details);

    // try {
    //     await knex.transaction(async trx => {
    //         await trx.raw(/*sql*/`
    //             INSERT INTO "article" (title, content, reading_time, user_id)
    //                 VALUES (:title, :content, :reading_time, :user_id);`),
    //         {
    //             title: "",
    //             content: "",
    //             reading_time: "",
    //             user_id: ""
    //         }

    //         await trx.rollback();

    //     })

    // } catch (e) {
    //     console.log(e);
    // }

    // await knex.destroy();

}


importData();