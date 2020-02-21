import { Request, Response, NextFunction } from 'express';

//import { RestaurantAll } from './services/restaurantModel';


// check if restaurant user loggedIn
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {

    // req.session.passport.user
    console.log('isloggedIn');
    console.log(req.user.id);
    if (req.user) {
        next();
    } else {
        res.redirect('./');
    }
}



// check if the loggedIn detail username and password are correct 
export function loginFlow(req: Request, res: Response, next: NextFunction) {
    return (err: Error, user: { id: number }, info: { message: string }) => {
        if (err) {
            console.log('path1');
            res.redirect("/login.html?error=" + err.message);
        } else if (info && info.message) {
            console.log('path2');
            res.redirect("/login.html?error=" + info.message);
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    console.log('path3');
                    res.redirect("/login.html?error=" + "Failed to Login");
                } else {
                    console.log('path4')
                    res.redirect("/m");// 如果login 成功
                }
            });
        }
    };
}
