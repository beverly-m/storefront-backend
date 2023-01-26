"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM products';
            const data = await dbConn.query(query);
            // console.log(data.rows);
            dbConn.release();
            return data.rows;
        }
        catch (error) {
            throw new Error(`Cannot retrieve products ${error}`);
        }
    }
    async show(id) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM products where id=($1)';
            const data = await dbConn.query(query, [id]);
            dbConn.release();
            // console.log(data.rows[0]);
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not retrieve product ${id}. Error: ${error}`);
        }
    }
    async create(newProduct) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [newProduct.name, newProduct.price]);
            dbConn.release();
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create product ${newProduct.name}. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
