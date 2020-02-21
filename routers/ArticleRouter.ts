import { Request, Response } from 'express';
import { ArticleService } from './../services/ArticleService';
// import { TagService } from '../services/TagService';
import * as express from 'express';
import * as Knex from 'knex';
import { Article } from '../services/models';




export class ArticleRouter {

    private articleService: ArticleService;
    // private tagService:TagService;

    constructor(private knex: Knex) {

        this.articleService = new ArticleService(this.knex)
        // this.tagService = new TagService(this.knex)

    }


    Router() {
        // create a router
        const router = express.Router();

        // no need to call this.create()?
        router.get('/showTopic', this.retrieveTopicArticle)
        router.post('/create', this.create)
        // return the router to the main
        return router;
    }


    // retrieve the articles related to certain topics
    retrieveTopicArticle = async (req: Request, res: Response) => {
        // const article = req.body.article
        // const userId = req.body.userId
        // const userId = 492;
        const userId = req.user.id;
        console.log(userId);
        const tags = await this.articleService.getUserTagName(userId);
        console.log({tagName:tags});
        const articles = await this.articleService.getTagsArticle(tags);
        console.log({articles:articles});
        res.json({ article: articles})

    }

    // create article
    create = async (req: Request, res: Response) => {
        const article: Article = req.body.article
        const userId: number = req.body.userId

        const articleId = await this.articleService.create(article, userId);


        // if (article.tag){

        //     await this.tagService.retrieve(article.tag);

        // }


        res.json({ id: articleId })

    }


    // update article
    update() {

    }
    // delete article
    delete = async (req: Request, res: Response) => {


    }

}