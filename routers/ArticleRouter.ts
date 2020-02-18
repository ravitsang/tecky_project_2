import { Request , Response, NextFunction} from 'express';
import { ArticleService } from './../services/ArticleService';
import * as express from 'express';
import * as Knex from 'knex';




export class ArticleRouter {

    private articleService:ArticleService;

    constructor(private knex:Knex){

        this.articleService = new ArticleService(this.knex)

    }


    Router (){
        // create a router
        const router = express.Router();

        // no need to call this.create()?
        router.post('/create', this.create)

        // return the router to the main
        return router;
    }


        // create article
        // not need to add const 
        create = async (req:Request, res:Response) => {
            const article = req.body.article
            const userId = req.body.userId

            const articleId = await this.articleService.create(article, userId);
            

            res.json({id:articleId})

        }

        // retrieve article
        // retrieveAll = async (req:Request, res:Response) => {
        //     const article = req.body.article
        //     const userId = req.body.userId

        //     const articleId = await this.articleService.create(article, userId);

        //     res.json({id:articleId})

        // }
        // update article
        update(){
    
        }
        // delete article
        delete(){
    
    
        }

}