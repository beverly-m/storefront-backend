"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const orderProduct_1 = require("../orderProduct");
const product_1 = require("../product");
const user_1 = require("../user");
const orderModelMock_1 = require("../../models/tests/utilities/orderModelMock");
const productModelMock_1 = require("./utilities/productModelMock");
const orderProductModelMock_1 = require("./utilities/orderProductModelMock");
const userModelMock_1 = require("./utilities/userModelMock");
const order_product = new orderProduct_1.OrderProductStore();
const order_product_mock = new orderProductModelMock_1.orderProductModelMock();
const user = new user_1.UserStore();
const user_mock = new userModelMock_1.userModelMock();
const product = new product_1.ProductStore();
const order = new order_1.OrderStore();
const order_mock = new orderModelMock_1.orderModelMock();
const product_mock = new productModelMock_1.productModelMock();
describe('Order Product Model', () => {
    beforeAll(async () => {
        try {
            await user.create({ firstname: "Queen", lastname: "Wellington", password: "test123" });
            await product.create({ name: 'quail', price: 5.50 });
            await product.create({ name: 'wafer', price: 2.50 });
            await order_mock.createMockOrder({ status: 'active', user_id: 1 });
            await order_product.create({ order_id: 1, product_id: 1, quantity: 1 });
        }
        catch (error) {
            throw new Error(`Error setting up test environment for order product model: ${error}`);
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
    it('show method should be defined', () => {
        expect(order_product.show).toBeDefined();
    });
    it('should return order details', async () => {
        const result = await order_product.show('1');
        expect(result).toEqual([{ order_id: 1, product_id: 1, name: 'quail', price: '5.50', quantity: 1 }]);
    });
});
