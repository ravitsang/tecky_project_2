import * as express from 'express';
// import * as Knex from 'knex';

// const knexConfig = require('./knexfile');
// const knex = Knex(knexConfig['development']);




const app = express();



const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})