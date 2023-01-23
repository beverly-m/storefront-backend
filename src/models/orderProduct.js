"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    async show(orderId) {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'SELECT o.order_id, o.product_id, p.name, p.price, o.quantity FROM order_products o, products p WHERE o.product_id=p.id AND o.order_id=($1)';
            const data = await dbConn.query(query, [orderId]);
            dbConn.release();
            // console.log(data.rows);
            return data.rows;
        }
        catch (error) {
            throw new Error(`Could not retrieve product list of ${orderId}. Error: ${error}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
