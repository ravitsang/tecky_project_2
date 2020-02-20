import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";





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
        return router;
    }



    userPage = async (req: Request, res: Response, next: NextFunction) => {

    }

    articlePage = async (req: Request, res: Response, next: NextFunction) => {

    }

    userInfo = async (req: Request, res: Response, next: NextFunction) => {
        if (req.session) {
            const result = {
                email: req.session.email,
                name: req.session.name,
                photo: req.session.photo
            }
            res.json(result);
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
        const { email, password } = req.body;
        const result = await this.userService.create(email, password);
        if (result && req.session) {
            req.session.isLogin = true;
            req.session.userinfo = result;
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }
    }
}
