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
        return router;
    }



    login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const result = await this.userService.login(email, password);
        if (result && req.session) {
            req.session.isLogin = true;
            req.session.email = email;
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
            req.session.email = email;
            res.json({ status: true });
        } else {
            res.json({ status: false });
        }

    }


}
