import { OrderStore } from "../order"
import { OrderProductStore } from "../orderProduct"
import { ProductStore } from "../product"
import { UserStore } from "../user"

const order_product = new OrderProductStore()
const user = new UserStore()
const product = new ProductStore()
const order = new OrderStore

describe('Order Product Model', () => {

    beforeAll(async () => {
        try {

            await user.create({ firstname: "Queen", lastname: "Wellington", password: "test123" })

            await product.create({ name: 'quail', price: 5.50 })

            await product.create({ name: 'wafer', price: 2.50 })

            await order.create({status: 'active', user_id: 1})

            await order_product.create({ order_id: 1, product_id: 1, quantity: 1})

        } catch (error) {
            throw new Error(`Error setting up test environment for order product model: ${error}`);
            
        }
    })

    afterAll( async () => {

        try {
            
            await order_product.clearOrderProductsTable()

            await order.clearOrdersTable()

            await product.clearProductsTable()

            await user.clearUsersTable()

            await user.resetUsersTableSequence()
            await order.resetOrdersTableSequence()
            await order_product.resetOrderProductsTableSequence()
            await product.resetProductsTableSequence()
        } catch (error) {
            throw new Error(`Error clearing test environment for order model: ${error}`);
        }
    })

    it('show method should be defined', () => {
        expect(order_product.show).toBeDefined()
    }) 

    it('should return order details', async() => {
        const result = await order_product.show('1')
        expect(result).toEqual([{ order_id: 1, product_id: 1, name: 'quail', price: '5.50', quantity: 1}])
    })
})