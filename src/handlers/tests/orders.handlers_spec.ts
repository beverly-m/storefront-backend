import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';
import { OrderProductStore } from '../../models/orderProduct';
import { orderModelMock } from '../../models/tests/utilities/orderModelMock';
import { productModelMock } from '../../models/tests/utilities/productModelMock';
import { orderProductModelMock } from '../../models/tests/utilities/orderProductModelMock';
import { userModelMock } from '../../models/tests/utilities/userModelMock';

dotenv.config();
const req = supertest(app);

const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;

const order = new OrderStore();
const order_mock = new orderModelMock();

const user = new UserStore();
const user_mock = new userModelMock();

const product = new ProductStore();
const product_mock = new productModelMock();

const order_product = new OrderProductStore();
const order_product_mock = new orderProductModelMock();

const payload = { id: 1, firstname: 'Queen', lastname: 'Wellington' };

const user_token = jwt.sign({ user: payload }, token_secret);
const invalid_user_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUYXJpcm8iLCJsYXN0bmFtZSI6IkJhbmRhIn0sImlhdCI6MTY3NDc.HACcDRyOfrr11f6gCC07RK0q1OU7FdtiPS';

describe('Test /orders endpoints', () => {
    beforeAll(async () => {
        try {
            await user.create({
                firstname: 'Queen',
                lastname: 'Wellington',
                password: 'test123',
            });
            await product.create({ name: 'quail', price: 5.5 });
            await product.create({ name: 'wafer', price: 2.5 });
            await product.create({ name: 'eggs(dozen)', price: 6.0 });
            await order_mock.createMockOrder({ status: 'active', user_id: 1 });
            await order_product.create({
                order_id: 1,
                product_id: 1,
                quantity: 1,
            });
            await order_product.create({
                order_id: 1,
                product_id: 3,
                quantity: 1,
            });
        } catch (error) {
            throw new Error(
                `Error setting up test environment for order model: ${error}`
            );
        }
    });

    afterAll(async () => {
        try {
            await order_product_mock.clearOrderProductsTable();
            await order_mock.clearOrdersTable();
            await product_mock.clearProductsTable();
            await user_mock.clearUsersTable();
            await user_mock.resetUsersTableSequence();
            await order_mock.resetOrdersTableSequence();
            await order_product_mock.resetOrderProductsTableSequence();
            await product_mock.resetProductsTableSequence();
        } catch (error) {
            throw new Error(
                `Error clearing test environment for order model: ${error}`
            );
        }
    });

    it('gets user current order with valid token', async () => {
        const res = await req.get('/orders/1').send({ token: user_token });
        expect(res.body).toEqual({
            order: { id: 1, status: 'active', user_id: 1 },
            productsList: [
                {
                    order_id: 1,
                    product_id: 1,
                    name: 'quail',
                    price: '5.50',
                    quantity: 1,
                },
                {
                    order_id: 1,
                    product_id: 3,
                    name: 'eggs(dozen)',
                    price: '6.00',
                    quantity: 1,
                },
            ],
        });

        expect(res.status).toEqual(200);
    });

    it('sends error message with invalid token', async () => {
        const res = await req
            .get('/orders/1')
            .send({ token: invalid_user_token });
        expect(res.status).toEqual(401);
    });

    it('sends error with no token provided', async () => {
        const res = await req.get('/orders/1');
        expect(res.status).toEqual(401);
    });

    it('sends error message when order id doesnt exist', async () => {
        const res = await req.get('/orders/5').send({ token: user_token });
        expect(res.status).toEqual(404);
    });
});
