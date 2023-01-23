import Client from "../database";

// export type OrderProduct = {
//     id? : Number;
//     orderId : Number;
//     productId : Number;
//     quantity : Number;
// }

export type OrderProduct = {
    orderId : Number;
    productId : Number;
    name : String;
    price : Number;
    quantity : Number;
}

export class OrderProductStore {

    async show(orderId: String): Promise<OrderProduct[]> {
        try {
            const dbConn = await Client.connect();
            const query = 'SELECT o.order_id, o.product_id, p.name, p.price, o.quantity FROM order_products o, products p WHERE o.product_id=p.id AND o.order_id=($1)';
            const data = await dbConn.query(query, [orderId]);
            dbConn.release();
            return data.rows;
        } catch (error) {
            throw new Error(`Could not retrieve product list of ${orderId}. Error: ${error}`)
        }
    }

}