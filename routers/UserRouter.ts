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
        router.post('/register', this.register);
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
        // const { email, password } = req.body;
        // const result = await this.userService.create(email, password);
        // if (result && req.session) {
        //     req.session.isLogin = true;
        //     req.session.email = email;
        //     res.json({ status: true });
        // } else {
        //     res.json({ status: false });
        // }
        try{
            const {email,password} = req.body
            const retrieve = await this.userService.retrieve();
            const users: User[] = retrieve.rows;
            const found = users.find(user => user.email === email);
            if(!found){
                const result = await this.userService.createUser(email,password);
                console.log(result)
                res.json({success:true})
            }else if(found){
                res.json({success:false})
            }
        }catch(err){
            res.status(400).json({msg:err.message})
        }

    }


}
