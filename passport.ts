import * as passport from "passport";
// import the passport local strategy
import * as passportLocal from 'passport-local';
import * as passportOauth2 from 'passport-oauth2';
import { checkPassword, hashPassword } from "./hash";
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { UserService } from "./services/UserService";
import { User } from "./services/models";

//import * as fetch from 'node-fetch';????


dotenv.config();

const userService = new UserService();
const LocalStrategy = passportLocal.Strategy;
// checking result will pass to loginFlow in guards anyway
passport.use(new LocalStrategy({
    // Tackle error:Missing Credentials
    usernameField:"email",
    passwordField:"password"
    },

    async function (email, password, done) {
        // console.log(email);
        // console.log(password);
        const retrieve = await userService.retrieve();
        const users: User[] = await retrieve.rows;
        const found = users.find(user => user.email === email);
        if (!found) {
            done(null, false, { message: "Incorrect username" });
            return;
        }
        //Checking the password using hash function
        const match = await checkPassword(password, found.password);
        console.log(match);
        if (match) {
            //Sub into serializeUser, can access user later
            console.log('localStrategy');
            done(null, { id: found.id });
        } else {
            done(null, false, { message: "Incorrect password" });
            return;
        }
    }
));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const OAuth2Strategy = passportOauth2.Strategy;
passport.use('google', new OAuth2Strategy({

    authorizationURL: 'https://accounts.google.com/o/oauth2/auth', // different OAuth provider have different authorizationURL
    tokenURL: "https://accounts.google.com/o/oauth2/token",// OAuth client use this token and ask OAuth provider to get the permission of accessing data of user
    clientID: GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID : "",
    clientSecret: GOOGLE_CLIENT_SECRET ? GOOGLE_CLIENT_SECRET : "",
    callbackURL: "http://localhost:8080/auth/google/callback"
    // callbackURL: "http://localhost:8080/auth/google/callback"
    // impressive flow/ no need tokenURL // get the token from this url

    // callbackURL: "https://readium.tk/auth/google/callback"
    // callbackURL: "http://localhost:8080/auth/google/callback"
},
    // use the accessToken and ask ask OAuth provider to grant the permission of accessing data of user
    // no refreshToken and profile / different provider will have different settings
    async function (accessToken: string, refreshToken: string, profile: any, done: Function) {
        const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: "get",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const result = await res.json();
        const retrieve = await userService.retrieve();
        const users: User[] = await retrieve.rows;
        let found = users.find((user) => user.email == result.email);
        
        // console.log(`found: ${found}`);
        if (!found) {
            const createResult :boolean|any = await userService.createUser(result.email, await hashPassword(Math.random().toString(36).substring(7)))
            if (createResult){
                found = await createResult.rows[0]
            }
        }
        // console.log(found);
        console.log('OAuth2Strategy');
        done(null, { accessToken, refreshToken, id: found?.id })
    }
));


// Run only in first time success login,
// save user id in passport session and use it afterwards 
passport.serializeUser(function (user: { id: number }, done) {
    // console.log('serializeUser');
    // console.log(user.id);
    done(null, user);
});


// Run every time after login 
// load the user from session
passport.deserializeUser(function (user: { id: number }, done) {
    // console.log('deserializeUser');
    done(null, user);
}); 