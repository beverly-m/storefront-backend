import express, { Request, Response } from 'express';
import orders from './api/orders.routes';
import products from './api/products.routes';
import users from './api/users.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

routes.use('/users', users);
routes.use('/products', products);
routes.use('/orders', orders);

export default routes;
