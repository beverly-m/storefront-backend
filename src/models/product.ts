import Client from "../database";

export type Product = {
    id? : Number;
    name: string;
    price: Number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM products';
            const data = await dbConn.query(query);
            console.log(data.rows);
            dbConn.release();
            return data.rows;
        } catch (error) {
            throw new Error(`Cannot retrieve products ${error}`);
            
        }
    }

    async show(id: String): Promise<Product> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT * FROM products where id=($1)';
            const data = await dbConn.query(query, [id]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];
        } catch (error) {
            throw new Error(`Could not retrieve product ${id}. Error: ${error}`)
        }
    }

    async create(newProduct: Product): Promise<Product> {
        try {
            const dbConn = await Client.connect();
            const query = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
            const data = await dbConn.query(query, [newProduct.name, newProduct.price]);
            dbConn.release();
            console.log(data.rows[0]);
            return data.rows[0];            
        } catch (error) {
            throw new Error(`Could not create product ${newProduct.name}. Error: ${error}`)
        }
    }
}

const productsql = new ProductStore;
productsql.index()
productsql.show("1")
// productsql.create({name: "Beans", price: 25})