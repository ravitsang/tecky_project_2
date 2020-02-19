import * as express from 'express';
import {Request,Response} from 'express';
import { EditorService } from '../services/EditorService';

export class EditorRouter{
    constructor(private editorService:EditorService){

    }

    router(){
        const editorRouter = express.Router();
        editorRouter.get('/',this.getArticles);
        editorRouter.post('/',this.createArticle);
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
            const article = req.body;
            const id = res.json(await this.editorService.create(article));
            res.json({id:id})
        }catch(err){
            res.status(400).json({msg:err.message})
        }
    }
}