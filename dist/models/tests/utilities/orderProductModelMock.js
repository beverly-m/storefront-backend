"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProductModelMock = void 0;
const database_1 = __importDefault(require("../../../database"));
class orderProductModelMock {
    async clearOrderProductsTable() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'DELETE FROM order_products';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not clear order_products table. ${error}`);
        }
    }
    async resetOrderProductsTableSequence() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not reset sequence of order_products table. ${error}`);
        }
    }
}
exports.orderProductModelMock = orderProductModelMock;
