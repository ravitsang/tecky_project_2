
import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import { UserRouter } from './routers/userRouter';
import { ArticleRouter } from './routers/ArticleRouter';
import * as Knex from 'knex';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])


const app = express();

app.use(expressSession({
    secret: "Test Secret",
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/api/v1/login', new UserRouter().login);
app.post('/api/v1/register', new UserRouter().register);
app.use('/article', new ArticleRouter(knex).Router())


app.use((req, res, next) => {
    if (req.session?.isLogin) {
        next();
    } else {
        res.status(401).redirect('/');
    }
})

app.use('/m', express.static('private'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})