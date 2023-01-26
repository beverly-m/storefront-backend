"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../../models/product");
const productModelMock_1 = require("../../models/tests/utilities/productModelMock");
dotenv_1.default.config();
const token_secret = process.env.TOKEN_SECRET;
const payload = { id: 1, firstname: "Queen", lastname: "Wellington" };
const user_token = jsonwebtoken_1.default.sign({ user: payload }, token_secret);
const invalid_user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUYXJpcm8iLCJsYXN0bmFtZSI6IkJhbmRhIn0sImlhdCI6MTY3NDc.HACcDRyOfrr11f6gCC07RK0q1OU7FdtiPS";
const product = new product_1.ProductStore();
const product_mock = new productModelMock_1.productModelMock();
const req = (0, supertest_1.default)(server_1.default);
describe('Test /products endpoints', () => {
    afterEach(async () => {
        await product_mock.clearProductsTable();
        await product_mock.resetProductsTableSequence();
    });
    it('GET /products/ returns all products', async () => {
        await product.create({ name: 'quail', price: 5.50 });
        await product.create({ name: 'wafer', price: 2.50 });
        const res = await req.get('/products/');
        expect(res.body).toEqual([{ id: 1, name: 'quail', price: '5.50' }, { id: 2, name: 'wafer', price: '2.50' }]);
    });
    it('GET /products/:id returns individual product with existing id', async () => {
        await product.create({ name: 'quail', price: 5.50 });
        await product.create({ name: 'wafer', price: 2.50 });
        const res = await req.get('/products/2');
        expect(res.body).toEqual({ id: 2, name: 'wafer', price: '2.50' });
        expect(res.status).toEqual(200);
    });
    it('GET /products/:id returns error with non existent id', async () => {
        await product.create({ name: 'quail', price: 5.50 });
        await product.create({ name: 'wafer', price: 2.50 });
        const res = await req.get('/products/5');
        expect(res.status).toEqual(404);
    });
    it('POST /products creates new product with valid token', async () => {
        const res = await req.post('/products/').send({ name: 'rice', price: 7.50, token: user_token });
        expect(res.body).toEqual({ id: 1, name: 'rice', price: '7.50' });
        expect(res.status).toEqual(201);
    });
    it('POST /products sends error when creating new product with invalid token', async () => {
        const res = await req.post('/products/').send({ name: 'rice', price: 7.50, token: invalid_user_token });
        expect(res.status).toEqual(401);
    });
});
