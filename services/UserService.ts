import * as Knex from "knex";
import { hashPassword } from '../hash'
import { User } from "./models";
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig[process.env.NODE_END || 'development'])

export class UserService {

    constructor() {

    }



    //create
    async create(email: string, password: string) {
        const retrieve = await this.retrieve();
        const users: User[] = retrieve.rows;
        const found = users.find(user => user.email === email);
        if (!found) {
            await knex.raw(/*sql*/ `INSERT INTO "user" ("name","email","password") VALUES(:name, :email, :password) RETURNING id`, {
                name: "Test",
                email: email,
                password: password
            });


            return true;
        } else {
            return false;
        }
    }

    // passport
    async createUser(email: string, password: string) {

        await knex.transaction(async trx =>{
            
            const name = email.split('@')[0];
            console.log(name);
            const result = await trx.raw(/*sql*/ `INSERT INTO "user" ("name","email","password") VALUES(:name, :email, :password) RETURNING id`, {
                name: name,
                email: email,
                password: await hashPassword(password)
            });
    
            const userId = result.rows[0].id
            console.log({userId:userId});
            const tagResult = await knex.raw(/*sql*/`SELECT name, tag.id FROM "tag"
                WHERE tag.name = 'Programming' `)
    
            const tagId = tagResult.rows[0].id
            console.log({tagId:tagId});
    
            await knex.raw(/*sql*/ `
                INSERT INTO "tag_user" ("user_id","tag_id")
                VALUES(:user_id, :tag_id)`,
            {
                user_id: userId,
                tag_id:tagId
            });
            
            await trx.rollback();
            return result
        })    

        await knex.destroy();
        return false;
    }

    //retrieve
    async retrieve() {
        return await knex.raw(/* sql */ `SELECT * FROM "user"`)
    }

    //update
    async update() {

    }

    //delete
    async delete() {


    }

    //login
    async login(email: string, password: string) {
        const retrieve = await this.retrieve();
        const users: User[] = retrieve.rows;
        const found = users.find(user => user.email === email && user.password === password);
        if (found) {
            return found;
        } else {
            return false;
        }
    }







}
