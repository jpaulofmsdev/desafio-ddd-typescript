import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('OrderService unit tests', () => {
    
    it('should place an order', () => {
        const customer = new Customer('customer1', 'Customer 1')
        const orderItem1 = new OrderItem('orderItem1', 'OrderItem 1', 10, 'product1', 1)
        const orderItem2 = new OrderItem('orderItem2', 'OrderItem 2', 20, 'product2', 2)

        const order = OrderService.placeOrder(customer, [orderItem1, orderItem2])

        expect(customer.rewardPoints).toBe(25)
        expect(order.total()).toBe(50)
    })

    it('should get all orders total', () => {
        const orderItem1 = new OrderItem('orderItem1', 'OrderItem 1', 10, 'product1', 1)
        const orderItem2 = new OrderItem('orderItem2', 'OrderItem 2', 20, 'product2', 2)

        const order1 = new Order('order1', 'customer1', [orderItem1])
        const order2 = new Order('order2', 'customer2', [orderItem2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(50)
    })
})