"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const orderProduct_1 = require("../../models/orderProduct");
const orderModelMock_1 = require("../../models/tests/utilities/orderModelMock");
const productModelMock_1 = require("../../models/tests/utilities/productModelMock");
const orderProductModelMock_1 = require("../../models/tests/utilities/orderProductModelMock");
const userModelMock_1 = require("../../models/tests/utilities/userModelMock");
dotenv_1.default.config();
const req = (0, supertest_1.default)(server_1.default);
const token_secret = process.env.TOKEN_SECRET;
const order = new order_1.OrderStore;
const order_mock = new orderModelMock_1.orderModelMock();
const user = new user_1.UserStore();
const user_mock = new userModelMock_1.userModelMock();
const product = new product_1.ProductStore();
const product_mock = new productModelMock_1.productModelMock();
const order_product = new orderProduct_1.OrderProductStore();
const order_product_mock = new orderProductModelMock_1.orderProductModelMock();
const payload = { id: 1, firstname: "Queen", lastname: "Wellington" };
const user_token = jsonwebtoken_1.default.sign({ user: payload }, token_secret);
const invalid_user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUYXJpcm8iLCJsYXN0bmFtZSI6IkJhbmRhIn0sImlhdCI6MTY3NDc.HACcDRyOfrr11f6gCC07RK0q1OU7FdtiPS";
describe('Test /orders endpoints', () => {
    beforeAll(async () => {
        try {
            await user.create({ firstname: "Queen", lastname: "Wellington", password: "test123" });
            await product.create({ name: 'quail', price: 5.50 });
            await product.create({ name: 'wafer', price: 2.50 });
            await product.create({ name: 'eggs(dozen)', price: 6.00 });
            await order_mock.createMockOrder({ status: 'active', user_id: 1 });
            await order_product.create({ order_id: 1, product_id: 1, quantity: 1 });
            await order_product.create({ order_id: 1, product_id: 3, quantity: 1 });
        }
        catch (error) {
            throw new Error(`Error setting up test environment for order model: ${error}`);
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
        }
        catch (error) {
            throw new Error(`Error clearing test environment for order model: ${error}`);
        }
    });
    it('gets user current order with valid token', async () => {
        const res = await req.get('/orders/1').send({ token: user_token });
        expect(res.body).toEqual({ order: { id: 1, status: 'active', user_id: 1 },
            productsList: [
                { order_id: 1, product_id: 1, name: 'quail', price: '5.50', quantity: 1 },
                { order_id: 1, product_id: 3, name: 'eggs(dozen)', price: '6.00', quantity: 1 }
            ]
        });
        expect(res.status).toEqual(200);
    });
    it('sends error message with invalid token', async () => {
        const res = await req.get('/orders/1').send({ token: invalid_user_token });
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
