"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModelMock = void 0;
const database_1 = __importDefault(require("../../../database"));
class productModelMock {
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
exports.productModelMock = productModelMock;
