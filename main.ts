
import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { UserRouter } from './routers/userRouter';
import { ArticleRouter } from './routers/ArticleRouter';
import { SearchRouter } from './routers/SearchRouter';

import * as Knex from 'knex';
import { EditorRouter } from './routers/editorRouter';
import { EditorService } from './services/editorService';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  })
const upload = multer({storage})

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
app.get('/api/v1/search', new SearchRouter().search);
app.use('/article', new ArticleRouter(knex).Router())
const editorService = new EditorService(knex);
app.use('/editor',new EditorRouter(editorService,upload).router());



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