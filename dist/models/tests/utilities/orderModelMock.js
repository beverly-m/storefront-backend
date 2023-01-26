"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModelMock = void 0;
const database_1 = __importDefault(require("../../../database"));
class orderModelMock {
    async createMockOrder(order) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [order.status, order.user_id]);
            dbConn.release();
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
    async clearOrdersTable() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'DELETE FROM orders';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not clear orders table. ${error}`);
        }
    }
    async resetOrdersTableSequence() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not reset sequence of orders table. ${error}`);
        }
    }
}
exports.orderModelMock = orderModelMock;
