"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.SALT_ROUNDS;
const salt = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM users';
            const data = await dbConn.query(query);
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
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not retrieve user ${id}. Error: ${error}`);
        }
    }
    async create(newUser) {
        try {
            const hashPassword = bcrypt_1.default.hashSync(newUser.password + pepper, parseInt(salt));
            const dbConn = await database_1.default.connect();
            const query = 'INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const data = await dbConn.query(query, [newUser.firstname, newUser.lastname, hashPassword]);
            dbConn.release();
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create user ${newUser.firstname} ${newUser.lastname}. Error: ${error}`);
        }
    }
}
exports.UserStore = UserStore;
