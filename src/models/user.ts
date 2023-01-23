import Client from "../database";

export type User = {
    id? : Number;
    firstName: string;
    lastName: string;
    password: string;
}


export class UserStore {
    async index(): Promise<User[]> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM users';
            const data = await dbConn.query(query);
            console.log(data.rows);
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
            console.log(data.rows[0]);
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not retrieve user ${id}. Error: ${error}`)
        }
    }

    async create(newUser: User): Promise<User> {
        try {
            const dbConn = await Client.connect();
            const query = 'INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const data = await dbConn.query(query, [newUser.firstName, newUser.lastName, newUser.password]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];            
        } catch (error) {
            throw new Error(`Could not create user ${newUser.firstName} ${newUser.lastName}. Error: ${error}`)
        }
    }
}

const usersql = new UserStore;
usersql.index()
usersql.show("1")
// usersql.create({firstName: "Isaac", lastName: "Werimac", password: "secret"})