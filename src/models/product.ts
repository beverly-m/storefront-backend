import Client from "../database";

export type Product = {
    id : Number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM employees';
            const data = await dbConn.query(query);
            dbConn.release();
            console.log(data.rows);
            return data.rows;
        } catch (error) {
            throw new Error(`Cannot retrieve employees ${error}`);
            
        }
    }
}

const productsql = new ProductStore;
productsql.index()