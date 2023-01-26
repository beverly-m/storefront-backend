import Client from '../database';
import {
    OrderProduct,
    OrderProductExtended,
    OrderProductStore,
} from './orderProduct';

export type Order = {
    id?: Number;
    status: string;
    user_id: Number;
};

export type OrderDetails = {
    order: Order;
    productsList: OrderProductExtended[];
};

export class OrderStore {
    async show(userId: String): Promise<OrderDetails> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM orders WHERE id=($1) AND status=($2)';
            const data = await dbConn.query(query, [userId, 'active']);
            const orderProducts = new OrderProductStore();
            const products = await orderProducts.show(data.rows[0].id);
            dbConn.release();
            // console.log({ order: data.rows[0], productsList: products });
            return { order: data.rows[0], productsList: products };
        } catch (error) {
            throw new Error(
                `Could not retrieve order ${userId}. Error: ${error}`
            );
        }
    }
}
