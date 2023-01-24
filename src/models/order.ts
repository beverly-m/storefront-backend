import Client from "../database";
import { OrderProduct, OrderProductExtended, OrderProductStore } from "./orderProduct";

export type Order = {
    id? : Number;
    status: string;
    user_id: Number;
}

export type OrderDetails = {
    order: Order,
    productsList: OrderProductExtended[]
}

export class OrderStore {

    async show(userId: String): Promise<OrderDetails> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM orders WHERE id=($1) AND status=($2)';
            const data = await dbConn.query(query, [userId, "active"]);
            const orderProducts = new OrderProductStore
            const products = await orderProducts.show(data.rows[0].id)
            dbConn.release();
            console.log({ order: data.rows[0], productsList: products });
            return { order: data.rows[0], productsList: products };
        } catch (error) {
            throw new Error(`Could not retrieve order ${userId}. Error: ${error}`) 
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const dbConn = await Client.connect();
            const query = 'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [order.status, order.user_id]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not create order. Error: ${error}`) 
        }
    }

}

// const ordersql = new OrderStore;
// ordersql.show("1")
// productsql.create({name: "Beans", price: 25})