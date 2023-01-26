import Client from '../../../database';

export class userModelMock {
    async clearUsersTable(): Promise<void> {
        try {
            const dbConn = await Client.connect();
            const query = 'DELETE FROM users';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(`Could not clear users table. ${error}`);
        }
    }

    async resetUsersTableSequence() {
        try {
            const dbConn = await Client.connect();
            const query = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        } catch (error) {
            throw new Error(
                `Could not reset sequence of users table. ${error}`
            );
        }
    }
}
