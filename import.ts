import * as Knex from 'knex';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig['development']);

async function main (){

    try{
        await knex.transaction(trx =>{
    
            
    
    
            trx.rollback();
    
        })

    }catch(e){
        console.log(e);
    }

    await knex.destroy();

}


main();