import Client from '../../../database';

export class orderProductModelMock {
    async clearOrderProductsTable(): Promise<void> {
        try {
            const dbConn = await Client.connect();
            const query = 'DELETE FROM order_products';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(`Could not clear order_products table. ${error}`);
        }
    }

    async resetOrderProductsTableSequence() {
        try {
            const dbConn = await Client.connect();
            const query = 'ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(
                `Could not reset sequence of order_products table. ${error}`
            );
        }
    }
}
