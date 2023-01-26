"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModelMock = void 0;
const database_1 = __importDefault(require("../../../database"));
class userModelMock {
    async clearUsersTable() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'DELETE FROM users';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not clear users table. ${error}`);
        }
    }
    async resetUsersTableSequence() {
        try {
            const dbConn = await database_1.default.connect();
            const query = 'ALTER SEQUENCE users_id_seq RESTART WITH 1';
            await dbConn.query(query);
            dbConn.release();
        }
        catch (error) {
            throw new Error(`Could not reset sequence of users table. ${error}`);
        }
    }
}
exports.userModelMock = userModelMock;
