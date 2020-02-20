
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
import './passport';
import { loginFlow, isLoggedIn} from './guards';

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
const upload = multer({storage})

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


app.use(express.static('public'));

app.post('/login', (...rest) => //rest = req, res, next)
    passport.authenticate('local', loginFlow(...rest))(...rest));

app.get('/auth/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
})); // API scopes that want to access from user / there are many scopes can use

// the path that come back from google after authorization from google
app.get('/auth/google/callback', (...rest) =>
    passport.authenticate('google', loginFlow(...rest))(...rest));

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

// app.post('/api/v1/login', new UserRouter().login);
// app.post('/api/v1/register', new UserRouter().register);
app.post('/register',new UserRouter().register);
app.get('/api/v1/search', new SearchRouter().search);
app.use('/article', new ArticleRouter(knex).Router())
const editorService = new EditorService(knex);
app.use('/editor',new EditorRouter(editorService,upload).router());



// app.use((req, res, next) => {
//     if (req.session?.isLogin) {
//         next();
//     } else {
//         res.status(401).redirect('/');
//     }
// })

// app.use(isLoggedIn);

app.use('/m',isLoggedIn, express.static('private'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})