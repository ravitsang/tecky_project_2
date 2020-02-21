import { Request, Response, NextFunction } from 'express';

//import { RestaurantAll } from './services/restaurantModel';


export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    // console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

export function loginFlow(req: Request, res: Response, next: NextFunction) {
    return (err: Error, user: { id: number }, info: { message: string }) => {
        if (err) {
            res.redirect("/?error=" + err.message);
        } else if (info && info.message) {
            res.redirect("/?error=" + info.message);
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    res.redirect("/?error=" + "Failed to Login");
                } else {
                    res.redirect("/m");
                }
            });
        }
    };
}
