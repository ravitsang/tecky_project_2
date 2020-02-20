import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import { UserRouter } from './routers/userRouter';
import { SearchRouter } from './routers/SearchRouter';

const app = express();

app.use(expressSession({
    secret: "Test Secret",
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    if (req.session?.isLogin) {
        app.use(express.static(`private`));
        res.sendFile(`private/index.html`, { root: `${__dirname}` });


    } else {
        app.use(express.static(`public`));
        res.sendFile(`public/index.html`, { root: `${__dirname}` });
    }
})

app.post('/api/v1/login', new UserRouter().login);
app.post('/api/v1/register', new UserRouter().register);
app.get('/api/v1/search', new SearchRouter().search);

app.use('/api/v1/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.session = null || undefined;
    res.redirect('/');
});







app.get('/api/v1/userInfo', new UserRouter().userInfo);





const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})