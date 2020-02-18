import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { SearchService } from "../services/SearchService";


export class SearchRouter {
    private searchService: SearchService;
    constructor() {
        this.searchService = new SearchService();
    }

    router() {
        const router = express.Router();
        router.get('/', this.search);
        return router;
    }

    search = async (req: Request, res: Response, next: NextFunction) => {
        const { q } = req.query;
        const tagResult = await this.searchService.searchTag(q);
        const userResult = await this.searchService.searchUser(q);
        const articleResult = await this.searchService.searchArticle(q);
        let searchList = [];
        searchList.push({ tag: tagResult });
        searchList.push({ user: userResult });
        searchList.push({ article: articleResult });
        res.json(searchList);
    }
}