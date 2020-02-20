import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../services/models";





export class UserRouter {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    router() {
        const router = express.Router();
        router.post('/', this.login);
        router.post('/', this.register);
        router.get('/', this.userInfo);
        router.get('/:user/', this.userPage);
        router.get('/:user/:title', this.articlePage);
        router.post('/', this.register);
        return router;
    }



    userPage = async (req: Request, res: Response, next: NextFunction) => {

    }

    articlePage = async (req: Request, res: Response, next: NextFunction) => {

    }

    userInfo = async (req: Request, res: Response, next: NextFunction) => {
        if (req.session?.passport.user.id) {
            const result = await this.userService.retrieve();
            const users: User[] = result.rows;
            const found = users.find(user => user.id === req.session?.passport.user.id);
            const user = {
                id: found?.id,
                name: found?.name,
                email: found?.email,
                link: found?.link,
                photo: found?.photo,
                membership: found?.membership
            }
            console.log(user);
            res.json(user);
        } else {
            res.status(404).redirect('/');
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const result = await this.userService.login(email, password);

        if (result && req.session) {
            req.session.isLogin = true;
            req.session.email = result.email;
            req.session.name = result.name;
            req.session.photo = result.photo;
            res.json({ status: true });
        } else {
            res.json({ status: false })
        }
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            const retrieve = await this.userService.retrieve();
            const users: User[] = retrieve.rows;
            const found = users.find(user => user.email === email);
            if (!found) {
                await this.userService.createUser(email, password);
                // console.log(result)
                res.json({ success: true })
            } else if (found) {
                res.json({ success: false })
            }
        } catch (err) {
            res.status(400).json({ msg: err.message })
        }
    }
}
