import * as express from 'express';
import * as multer from 'multer'
import {Request,Response} from 'express';
import { EditorService } from '../services/EditorService';

type Multer = ReturnType<typeof multer>;

export class EditorRouter{
    constructor(private editorService:EditorService,private upload:Multer){

    }

    router(){
        const editorRouter = express.Router();
        editorRouter.get('/',this.getArticles);
        editorRouter.post('/create',this.upload.array('upload'),this.createArticle);
        return editorRouter;
    }

    getArticles = async (req:Request,res:Response)=>{
        try{
            res.json(await this.editorService.retrieve());
        }catch(err){
            res.status(400).json({msg:err.message})
        }
    }

    createArticle = async (req:Request,res:Response)=>{
        try{
            const title = req.body.title;
            const content = req.body.content;
            const userId = req.user.id
            console.log(title)
            console.log(content)
            console.log(userId)
            console.log(req.files)
            const articleId = res.json(await this.editorService.create(title,content,userId));
            res.json({id:articleId})
        }catch(err){
            res.status(400).json({msg:err.message})
        }
    }
}