"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
class UserStore {
    async index() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM users';
            const data = await dbConn.query(query);
            console.log(data.rows);
            dbConn.release();
            return data.rows;
        }
        catch (error) {
            throw new Error(`Cannot retrieve users ${error}`);
        }
    }
    async show(id) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM users where id=($1)';
            const data = await dbConn.query(query, [id]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not retrieve user ${id}. Error: ${error}`);
        }
    }
    async create(newUser) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const data = await dbConn.query(query, [newUser.firstName, newUser.lastName, newUser.password]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create user ${newUser.firstName} ${newUser.lastName}. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
const usersql = new UserStore;
usersql.index();
usersql.show("1");
// usersql.create({firstName: "Isaac", lastName: "Werimac", password: "secret"})
