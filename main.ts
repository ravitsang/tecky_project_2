import * as express from 'express';
// import * as Knex from 'knex';

// const knexConfig = require('./knexfile');
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])




const app = express();

app.use(express.static('public'));




const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})