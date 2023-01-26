import Client from '../../../database';
import { Order } from '../../order';

export class orderModelMock {
    async createMockOrder(order: Order): Promise<Order> {
        try {
            const dbConn = await Client.connect();
            const query =
                'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [
                order.status,
                order.user_id,
            ]);
            dbConn.release();
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not create order. Error: ${error}`);
        }
    }

    async clearOrdersTable(): Promise<void> {
        try {
            const dbConn = await Client.connect();
            const query = 'DELETE FROM orders';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(`Could not clear orders table. ${error}`);
        }
    }

    async resetOrdersTableSequence() {
        try {
            const dbConn = await Client.connect();
            const query = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(
                `Could not reset sequence of orders table. ${error}`
            );
        }
    }
}
