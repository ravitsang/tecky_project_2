import * as Knex from "knex";
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
            return true;
        } else {
            return false;
        }
    }









}

