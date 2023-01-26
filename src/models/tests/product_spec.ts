import { ProductStore } from '../product';
import { productModelMock } from './utilities/productModelMock';

const product = new ProductStore();
const product_mock = new productModelMock();

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
        await product.create({ name: 'quail', price: 5.5 });
        await product.create({ name: 'wafer', price: 2.5 });
        const result = await product.index();
        expect(result).toEqual([
            { id: 1, name: 'quail', price: '5.50' },
            { id: 2, name: 'wafer', price: '2.50' },
        ]);
    });

    it('should return product with matching id', async () => {
        await product.create({ name: 'quail', price: 5.5 });
        await product.create({ name: 'wafer', price: 2.5 });

        const result = await product.show('2');
        expect(result).toEqual({ id: 2, name: 'wafer', price: '2.50' });
    });

    it('should create product', async () => {
        const result = await product.create({ name: 'rice', price: 7.5 });
        expect(result).toEqual({ id: 1, name: 'rice', price: '7.50' });
    });
});
