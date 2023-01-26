import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.SALT_ROUNDS;
const salt = process.env.SALT_ROUNDS as unknown as string;

export type User = {
    id?: Number;
    firstname: string;
    lastname: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM users';
            const data = await dbConn.query(query);
            dbConn.release();
            return data.rows;
        } catch (error) {
            throw new Error(`Cannot retrieve users ${error}`);
        }
    }

    async show(id: String): Promise<User> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM users where id=($1)';
            const data = await dbConn.query(query, [id]);
            dbConn.release();
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not retrieve user ${id}. Error: ${error}`);
        }
    }

    async create(newUser: User): Promise<User> {
        try {
            const hashPassword = bcrypt.hashSync(
                newUser.password + pepper,
                parseInt(salt)
            );
            const dbConn = await Client.connect();
            const query =
                'INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const data = await dbConn.query(query, [
                newUser.firstname,
                newUser.lastname,
                hashPassword,
            ]);
            dbConn.release();
            return data.rows[0];
        } catch (error) {
            throw new Error(
                `Could not create user ${newUser.firstname} ${newUser.lastname}. Error: ${error}`
            );
        }
    }
}
