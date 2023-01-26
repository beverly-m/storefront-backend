import { OrderProductStore } from '../orderProduct';
import { ProductStore } from '../product';
import { UserStore } from '../user';
import { orderModelMock } from '../../models/tests/utilities/orderModelMock';
import { productModelMock } from './utilities/productModelMock';
import { orderProductModelMock } from './utilities/orderProductModelMock';
import { userModelMock } from './utilities/userModelMock';

const order_product = new OrderProductStore();
const order_product_mock = new orderProductModelMock();
const user = new UserStore();
const user_mock = new userModelMock();
const product = new ProductStore();
const order_mock = new orderModelMock();
const product_mock = new productModelMock();

describe('Order Product Model', () => {
    beforeAll(async () => {
        try {
            await user.create({
                firstname: 'Queen',
                lastname: 'Wellington',
                password: 'test123',
            });

            await product.create({ name: 'quail', price: 5.5 });

            await product.create({ name: 'wafer', price: 2.5 });

            await order_mock.createMockOrder({ status: 'active', user_id: 1 });

            await order_product.create({
                order_id: 1,
                product_id: 1,
                quantity: 1,
            });
        } catch (error) {
            throw new Error(
                `Error setting up test environment for order product model: ${error}`
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

    it('show method should be defined', () => {
        expect(order_product.show).toBeDefined();
    });

    it('should return order details', async () => {
        const result = await order_product.show('1');
        expect(result).toEqual([
            {
                order_id: 1,
                product_id: 1,
                name: 'quail',
                price: '5.50',
                quantity: 1,
            },
        ]);
    });
});
