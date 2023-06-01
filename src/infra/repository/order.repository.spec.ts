import { Sequelize } from "sequelize-typescript"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerModel from "../db/sequelize/model/customer.model"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"
import CustomerRepository from "./customer.repository"
import Product from "../../domain/entity/product"
import ProductRepository from "./product.repository"
import OrderItem from "../../domain/entity/order_item"
import Order from "../../domain/entity/order"
import OrderRepository from "./order.repository"

describe('OrderRepository test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            OrderModel,
            OrderItemModel,
            ProductModel,
            CustomerModel
        ])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("c1", "Customer 1")
        const addreess1 = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer1.changeAddress(addreess1)
        await customerRepository.create(customer1)

        const productRepository = new ProductRepository()
        const product1 = new Product("p1", "Product 1", 10)
        await productRepository.create(product1)

        const orderRepository = new OrderRepository()
        const orderItem1 = new OrderItem(
            "oi1",
            product1.name,
            product1.price,
            product1.id,
            2
        )
        const order = new Order("o1", customer1.id, [orderItem1])
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customerId: "c1",
            total: 20,
            items: [
                {
                    id: "oi1",
                    name: "Product 1",
                    price: 10,
                    quantity: 2,
                    productId: "p1",
                    total: 20,
                    orderId: "o1"
                }
            ]
        })
    })

    it('should update a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("c1", "Customer 1")
        const addreess1 = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer1.changeAddress(addreess1)
        await customerRepository.create(customer1)

        const customer2 = new Customer("c2", "Customer 2")
        const addreess2 = new Address("Street 2", 2, "Zipcode 2", "City 2")
        customer2.changeAddress(addreess2)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product1 = new Product("p1", "Product 1", 10)
        await productRepository.create(product1)

        const product2 = new Product("p2", "Product 2", 20)
        await productRepository.create(product2)

        const orderRepository = new OrderRepository()
        const orderItem1 = new OrderItem(
            "oi1",
            product1.name,
            product1.price,
            product1.id,
            2
        )
        const order = new Order("o1", customer1.id, [orderItem1])
        await orderRepository.create(order)

        order.changeCustomer(customer2.id)
        order.addItem(new OrderItem("oi2", product2.name, product2.price, product2.id, 3))
        order.changeItem("oi1", new OrderItem("oi1", product1.name, product1.price, product1.id, 1))

        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customerId: "c2",
            total: 70,
            items: [
                {
                    id: "oi1",
                    name: "Product 1",
                    price: 10,
                    quantity: 1,
                    productId: "p1",
                    total: 10,
                    orderId: "o1"
                },
                {
                    id: "oi2",
                    name: "Product 2",
                    price: 20,
                    quantity: 3,
                    productId: "p2",
                    total: 60,
                    orderId: "o1"
                }
            ]
        })
    })

    it('should find a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("c1", "Customer 1")
        const addreess1 = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer1.changeAddress(addreess1)
        await customerRepository.create(customer1)

        const productRepository = new ProductRepository()
        const product1 = new Product("p1", "Product 1", 10)
        await productRepository.create(product1)

        const orderRepository = new OrderRepository()
        const orderItem1 = new OrderItem(
            "oi1",
            product1.name,
            product1.price,
            product1.id,
            2
        )
        const order = new Order("o1", customer1.id, [orderItem1])
        await orderRepository.create(order)

        const foundOrder = await orderRepository.find(order.id)

        expect(foundOrder).toStrictEqual(order)
    })

    it('shoulf throw error when order not found', async () => {
        expect(async () => {
            const orderRepository = new OrderRepository()
            await orderRepository.find("123")
        }).rejects.toThrowError("Order not found")
    })

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("c1", "Customer 1")
        const addreess1 = new Address("Street 1", 1, "Zipcode 1", "City 1")
        customer1.changeAddress(addreess1)
        await customerRepository.create(customer1)

        const customer2 = new Customer("c2", "Customer 2")
        const addreess2 = new Address("Street 2", 2, "Zipcode 2", "City 2")
        customer2.changeAddress(addreess2)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product1 = new Product("p1", "Product 1", 10)
        await productRepository.create(product1)

        const product2 = new Product("p2", "Product 2", 20)
        await productRepository.create(product2)

        const orderItem1 = new OrderItem("oi1", product1.name, product1.price, product1.id, 2
        )
        const orderItem2 = new OrderItem("oi2", product2.name, product2.price, product2.id, 3)
        const order1 = new Order("o1", customer1.id, [orderItem1])
        const order2 = new Order("o2", customer2.id, [orderItem2])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order1)
        await orderRepository.create(order2)

        const orders = await orderRepository.findAll()

        expect(orders.length).toBe(2)
        expect(orders).toStrictEqual([order1, order2])
    })

})