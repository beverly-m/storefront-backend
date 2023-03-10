import Client from '../database';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

export type OrderProductExtended = {
    order_id: number;
    product_id: number;
    name: string;
    price: number | string;
    quantity: number;
};

export class OrderProductStore {
    async show(orderId: string): Promise<OrderProductExtended[]> {
        try {
            const dbConn = await Client.connect();
            const query =
                'SELECT o.order_id, o.product_id, p.name, p.price, o.quantity FROM order_products o, products p WHERE o.product_id=p.id AND o.order_id=($1)';
            const data = await dbConn.query(query, [orderId]);
            dbConn.release();
            return data.rows;
        } catch (error) {
            throw new Error(
                `Could not retrieve product list of ${orderId}. Error: ${error}`
            );
        }
    }

    async create(orderProduct: OrderProduct): Promise<OrderProduct> {
        try {
            const dbConn = await Client.connect();
            const query =
                'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const data = await dbConn.query(query, [
                orderProduct.order_id,
                orderProduct.product_id,
                orderProduct.quantity,
            ]);
            dbConn.release();
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not record product order. Error: ${error}`);
        }
    }
}
