
import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import { UserRouter } from './routers/UserRouter';
import { ArticleRouter } from './routers/ArticleRouter';
import { SearchRouter } from './routers/SearchRouter';

import * as Knex from 'knex';
import * as passport from 'passport';
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


// put after sessions
app.use(passport.initialize());
app.use(passport.session());

import './passport';
import { loginFlow} from './guards';

app.use(express.static('public'));

app.post('/login', (...rest) => //rest = req, res, next)
    passport.authenticate('local', loginFlow(...rest))(...rest));


app.get('/auth/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
})); // API scopes that want to access from user / there are many scopes can use

// the path that come back from google after authorization from google
app.get('/auth/google/callback', (...rest) =>
    passport.authenticate('google', loginFlow(...rest))(...rest));

// app.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/login.html')
// })

app.post('/api/v1/login', new UserRouter().login);
app.post('/api/v1/register', new UserRouter().register);
app.get('/api/v1/search', new SearchRouter().search);
app.use('/article', new ArticleRouter(knex).Router())

app.use((req, res, next) => {
    if (req.session?.isLogin) {
        next();
    } else {
        res.status(401).redirect('/');
    }
})

// app.use(isLoggedIn);

app.use('/m', express.static('private'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})