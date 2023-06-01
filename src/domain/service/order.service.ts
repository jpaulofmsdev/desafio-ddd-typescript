import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid"

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.total(), 0)
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {

        const order = new Order(uuid(), customer.id, orderItems)
        customer.addRewardPoints(order.total() * 0.5)

        return order
    }

}