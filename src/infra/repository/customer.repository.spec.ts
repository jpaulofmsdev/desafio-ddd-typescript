import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe('CustomerRepository test', () => {
    
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            CustomerModel
        ])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a new customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('123', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({
            where: { id: '123' }
        })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city
        })
    })

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('123', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        customer.changeName('Customer 2')
        customer.changeAddress(new Address('Street 2', 2, 'Zipcode 2', 'City 2'))
        customer.activate()
        customer.addRewardPoints(10)
        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({
            where: { id: '123' }
        })
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city
        })
    })

    it('should throw an error when customer not found', async () => {
        const customerRepository = new CustomerRepository()
        await expect(async () => {
            await customerRepository.find('123')
        }).rejects.toThrow('Customer not found')
    })

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('123', 'Customer 1')
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        customer.activate()
        customer.addRewardPoints(10)
        await customerRepository.create(customer)

        const foundCustomer = await customerRepository.find(customer.id)

        expect(foundCustomer).toStrictEqual(customer)
    })

    it('should find all customers', async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer('123', 'Customer 1')
        const address1 = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
        customer1.changeAddress(address1)
        await customerRepository.create(customer1)

        const customer2 = new Customer('456', 'Customer 2')
        const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2')
        customer2.changeAddress(address2)
        await customerRepository.create(customer2)

        const foundCustomers = await customerRepository.findAll()
        expect(foundCustomers.length).toBe(2)
        expect(foundCustomers[0]).toStrictEqual(customer1)
        expect(foundCustomers[1]).toStrictEqual(customer2)
    })
})