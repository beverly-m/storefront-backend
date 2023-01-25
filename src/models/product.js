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
            // console.log(data.rows[0]);
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create product ${newProduct.name}. Error: ${error}`);
        }
    }
    async clearProductsTable() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'DELETE FROM products';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not clear products table. ${error}`);
        }
    }
    async resetProductsTableSequence() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not reset sequence of products table. ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
// const productsql = new ProductStore;
// productsql.index()
// productsql.show("1")
// productsql.create({name: "Beans", price: 25})
