import { Request, Response } from 'express';
import { ArticleService } from './../services/ArticleService';
// import { TagService } from '../services/TagService';
import * as express from 'express';
import * as Knex from 'knex';
// import { Article } from '../services/models';



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
        router.get('/viewArticle', this.getFullArticle)
        router.get('/:articleId/:bookmarked', this.addBookmark)
        // router.get('/:articleId', this.addBookmark)
        router.get('/getUserArticles',this.getUserArticles)
        // return the router to the main
        return router;
    }


    // retrieve the articles related to certain topics
    retrieveTopicArticle = async (req: Request, res: Response) => {

        let allArticles = [];
        const userId = req.user.id;
        // console.log(userId);
        const tags = await this.articleService.getUserTagName(userId);
        // console.log({ tagName: tags });
        for (let tag of tags) {
            const articles = await this.articleService.getTagsArticle(tag);
            
            allArticles.push(articles);
        }
        // const tag = tags[1]
        // const articles = await this.articleService.getTagsArticle(tag);
        // allArticles.push(articles);

        // console.log({ articles: allArticles });
        res.json({ article: allArticles })

    }


    getFullArticle = async (req: Request, res: Response) => {

        const articleId :number  = parseInt(req.query.articleId);
        // console.log(articleId);
        // const userId: number = req.body.userId

        const article = await this.articleService.retrieve(articleId);
        // console.log({result:article});

        const authorName = await this.articleService.getAuthorName(articleId);

        
        // console.log({result:article});

        res.json({ article: article, authorName:authorName })

    }

    addBookmark = async (req: Request, res: Response) =>{
        const userId = parseInt(req.user.id);
        console.log(req.params);
        const articleId = parseInt(req.params.articleId);
        const bookmarked = req.params.bookmarked;
        console.log({bookmarked:bookmarked});
        console.log({articleId:articleId});
        console.log({userId:userId});

        const isBookmarkExist = await this.articleService.isBookmarkExist(articleId,userId);
        console.log({isBookmarkExist:isBookmarkExist});
        if (isBookmarkExist){
            const result = await this.articleService.editBookmarkStatus(articleId,userId,bookmarked);
            console.log({editBookmarkStatus:result});
            res.json({success:result})
        }else{
            const result = await this.articleService.addBookmark(articleId,userId);
            console.log({addBookmark:result});
            res.json({success:result})
        }



    }

    getUserArticles = async (req:Request,res:Response)=>{
        const userId = parseInt(req.user.id)
        await this.articleService.retrieveAll(userId)
        res.json({success:true})
    }

    // update article
    update() {

    }
    // delete article
    delete = async (req: Request, res: Response) => {


    }

}