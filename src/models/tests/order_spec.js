"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const product_1 = require("../product");
const orderProduct_1 = require("../orderProduct");
const order = new order_1.OrderStore();
const user = new user_1.UserStore();
const product = new product_1.ProductStore();
const order_product = new orderProduct_1.OrderProductStore();
describe("Order Model", () => {
    beforeAll(async () => {
        try {
            await user.create({ firstName: "Queen", lastName: "Wellington", password: "test123" });
            await product.create({ name: 'quail', price: 5.50 });
            await product.create({ name: 'wafer', price: 2.50 });
            await product.create({ name: 'eggs(dozen)', price: 6.00 });
            await order.create({ status: 'active', user_id: 1 });
            await order_product.create({ order_id: 1, product_id: 1, quantity: 1 });
            await order_product.create({ order_id: 1, product_id: 3, quantity: 1 });
        }
        catch (error) {
            throw new Error(`Error setting up test environment: ${error}`);
        }
    });
    it('should contain a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should return order details', async () => {
        const result = await order.show("1");
        expect(result).toEqual({ order: { id: 1, status: 'active', user_id: 1 },
            productsList: [
                { order_id: 1, product_id: 1, name: 'quail', price: 5.50, quantity: 1 },
                { order_id: 1, product_id: 3, name: 'eggs(dozen)', price: 6.00, quantity: 1 }
            ]
        });
    });
});
