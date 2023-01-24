"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
const orderProduct_1 = require("./orderProduct");
class OrderStore {
    async show(userId) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT * FROM orders WHERE id=($1) AND status=($2)';
            const data = await dbConn.query(query, [userId, "active"]);
            const orderProducts = new orderProduct_1.OrderProductStore;
            const products = await orderProducts.show(data.rows[0].id);
            dbConn.release();
            console.log({ order: data.rows[0], productsList: products });
            return { order: data.rows[0], productsList: products };
        }
        catch (error) {
            throw new Error(`Could not retrieve order ${userId}. Error: ${error}`);
        }
    }
    async create(order) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [order.status, order.user_id]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];
        }
        catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
// const ordersql = new OrderStore;
// ordersql.show("1")
// productsql.create({name: "Beans", price: 25})
