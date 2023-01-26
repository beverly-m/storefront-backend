"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const productModelMock_1 = require("./utilities/productModelMock");
const product = new product_1.ProductStore();
const product_mock = new productModelMock_1.productModelMock();
describe('Product Model', () => {
    afterEach(async () => {
        await product_mock.clearProductsTable();
        await product_mock.resetProductsTableSequence();
    });
    it('index method should be defined', () => {
        expect(product.index).toBeDefined();
    });
    it('show method should be defined', () => {
        expect(product.show).toBeDefined();
    });
    it('create method should be defined', () => {
        expect(product.create).toBeDefined();
    });
    it('should return all products', async () => {
        await product.create({ name: 'quail', price: 5.50 });
        await product.create({ name: 'wafer', price: 2.50 });
        const result = await product.index();
        expect(result).toEqual([{ id: 1, name: 'quail', price: '5.50' }, { id: 2, name: 'wafer', price: '2.50' }]);
    });
    it('should return product with matching id', async () => {
        await product.create({ name: 'quail', price: 5.50 });
        await product.create({ name: 'wafer', price: 2.50 });
        const result = await product.show('2');
        expect(result).toEqual({ id: 2, name: 'wafer', price: '2.50' });
    });
    it('should create product', async () => {
        const result = await product.create({ name: 'rice', price: 7.50 });
        expect(result).toEqual({ id: 1, name: 'rice', price: '7.50' });
    });
});
