import { v4 } from "uuid"
import OrderFactory from "./order.factory"

describe('Order Factory unit test', () => {
    
    it('should create an order', () => {
        const orderProps = {
            id: v4(),
            customerId: v4(),
            items: [
                {
                    id: v4(),
                    name: 'Product A',
                    productId: v4(),
                    price: 100,
                    quantity: 1
                }
            ]
        }

        const order = OrderFactory.create(orderProps)

        expect(order.id).toBeDefined()
        expect(order.customerId).toBe(orderProps.customerId)
        expect(order.items.length).toBe(1)
        expect(order.items[0].id).toBe(orderProps.items[0].id)
        expect(order.items[0].name).toBe(orderProps.items[0].name)
        expect(order.items[0].productId).toBe(orderProps.items[0].productId)
        expect(order.items[0].price).toBe(orderProps.items[0].price)
        expect(order.items[0].quantity).toBe(orderProps.items[0].quantity)
    })
})