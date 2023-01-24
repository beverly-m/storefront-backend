import { Order, OrderStore } from "../order";

const order = new OrderStore();

describe("Order Model", () => {
    it('should contain a show method', () => {
        expect(order.show).toBeDefined();
    });
});