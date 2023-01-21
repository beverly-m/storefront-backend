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
            const query = 'SELECT * FROM employees';
            const data = await dbConn.query(query);
            dbConn.release();
            console.log(data.rows);
            return data.rows;
        }
        catch (error) {
            throw new Error(`Cannot retrieve employees ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
const productsql = new ProductStore;
productsql.index();
