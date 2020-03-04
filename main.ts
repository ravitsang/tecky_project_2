
import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { UserRouter } from './routers/UserRouter';
import { ArticleRouter } from './routers/ArticleRouter';
import { SearchRouter } from './routers/SearchRouter';
import * as passport from "passport";
import * as Knex from 'knex';
import { EditorRouter } from './routers/EditorRouter';
import { EditorService } from './services/EditorService';
import { loginFlow, isLoggedIn } from './guards';

const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/private/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})
const upload = multer({ storage })

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
app.use(express.static(`public`));

app.post('/api/v1/login',
    (req, res, next) =>
        passport.authenticate('local', loginFlow(req, res, next))(req, res, next));


app.get('/auth/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
})); 


app.get('/auth/google/callback', (...rest) =>
    passport.authenticate('google', loginFlow(...rest))(...rest));


app.post('/api/v1/register', new UserRouter().register);



app.use('/m', isLoggedIn, express.static('private'));
app.get('/api/v1/userInfo', new UserRouter().userInfo);
app.get('/api/v1/search', new SearchRouter().search);
app.use('/article', new ArticleRouter(knex).Router())
const editorService = new EditorService(knex);
app.use('/editor', new EditorRouter(editorService, upload).router());

app.get('/api/v1/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})