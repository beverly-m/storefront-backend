import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { ProductStore } from '../../models/product';
import { productModelMock } from '../../models/tests/utilities/productModelMock';

dotenv.config();

const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;

const payload = { id: 1, firstname: 'Queen', lastname: 'Wellington' };
const user_token = jwt.sign({ user: payload }, token_secret);
const invalid_user_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUYXJpcm8iLCJsYXN0bmFtZSI6IkJhbmRhIn0sImlhdCI6MTY3NDc.HACcDRyOfrr11f6gCC07RK0q1OU7FdtiPS';

const product = new ProductStore();
const product_mock = new productModelMock();
const req = supertest(app);

describe('Test /products endpoints', () => {
    afterEach(async () => {
        await product_mock.clearProductsTable();
        await product_mock.resetProductsTableSequence();
    });

    it('GET /products/ returns all products', async () => {
        await product.create({ name: 'quail', price: 5.5 });
        await product.create({ name: 'wafer', price: 2.5 });

        const res = await req.get('/products/');
        expect(res.body).toEqual([
            { id: 1, name: 'quail', price: '5.50' },
            { id: 2, name: 'wafer', price: '2.50' },
        ]);
    });

    it('GET /products/:id returns individual product with existing id', async () => {
        await product.create({ name: 'quail', price: 5.5 });
        await product.create({ name: 'wafer', price: 2.5 });

        const res = await req.get('/products/2');
        expect(res.body).toEqual({ id: 2, name: 'wafer', price: '2.50' });
        expect(res.status).toEqual(200);
    });

    it('GET /products/:id returns error with non existent id', async () => {
        await product.create({ name: 'quail', price: 5.5 });
        await product.create({ name: 'wafer', price: 2.5 });

        const res = await req.get('/products/5');
        expect(res.status).toEqual(404);
    });

    it('POST /products creates new product with valid token', async () => {
        const res = await req
            .post('/products/')
            .send({ name: 'rice', price: 7.5, token: user_token });
        expect(res.body).toEqual({ id: 1, name: 'rice', price: '7.50' });
        expect(res.status).toEqual(201);
    });

    it('POST /products sends error when creating new product with invalid token', async () => {
        const res = await req
            .post('/products/')
            .send({ name: 'rice', price: 7.5, token: invalid_user_token });
        expect(res.status).toEqual(401);
    });
});
