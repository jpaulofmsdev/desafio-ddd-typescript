import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests', () => {
    it('should throw error when Id is empty', () => {
        expect(() => {
            new Order('', '321', [])
        }).toThrowError('Id is required')
    })

    it('should throw error when customerId is empty', () => {
        expect(() => {
            new Order('123', '', [])
        }).toThrowError('CustomerId is required')
    })

    it('should throw error when items is empty', () => {
        expect(() => {
            new Order('123', '321', [])
        }).toThrowError('Items is required')
    })

    it('should calculate total', () => {
        const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 2)
        const item2 = new OrderItem('2', 'Item 2', 20, 'p2', 3)
        const order = new Order('123', '321', [item1, item2])
        expect(order.total()).toBe(80)
    })

    it('should throw error when order item quantity is zero', () => {
        expect(() => {
            new OrderItem('1', 'Item 1', 10, 'p1', 0)
        }).toThrowError('Quantity must be greater than zero')
    })

    it('should throw error when order item quantity is negative', () => {
        expect(() => {
            new OrderItem('1', 'Item 1', 10, 'p1', -2)
        }).toThrowError('Quantity must be greater than zero')
    })
})