import Client from '../../../database';

export class productModelMock {
    async clearProductsTable(): Promise<void> {
        try {
            const dbConn = await Client.connect();
            const query = 'DELETE FROM products';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(`Could not clear products table. ${error}`);
        }
    }

    async resetProductsTableSequence() {
        try {
            const dbConn = await Client.connect();
            const query = 'ALTER SEQUENCE products_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(
                `Could not reset sequence of products table. ${error}`
            );
        }
    }
}
