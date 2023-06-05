import IEventDispatcher from "../../../../domain/@shared/event/event-dispatcher.interface";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerCreatedEvent from "../../../../domain/customer/event/customer-created.event";
import ICustomerRepository from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements ICustomerRepository {

    private eventDispatcher: IEventDispatcher

    constructor(eventDispacher?: IEventDispatcher) {
        this.eventDispatcher = eventDispacher
    }
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city
        })
        if(this.eventDispatcher){
            this.eventDispatcher.notify(new CustomerCreatedEvent(entity))
        }
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
                street: entity.Address.street,
                number: entity.Address.number,
                zip: entity.Address.zip,
                city: entity.Address.city
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
    async find(id: string): Promise<Customer> {
        try {
            const customerModel = await CustomerModel.findByPk(id, {
                rejectOnEmpty: true
            })
            const address = new Address(customerModel.street, customerModel.number, customerModel.zip, customerModel.city)
            const customer = new Customer(customerModel.id, customerModel.name)
            customer.changeAddress(address)
            customer.addRewardPoints(customerModel.rewardPoints)
            customerModel.active ? customer.activate() : customer.deactivate()
            return customer
        } catch (error) {
            throw new Error('Customer not found')
        }
    }
    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll()
        return customersModel.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name)
            const address = new Address(customerModel.street, customerModel.number, customerModel.zip, customerModel.city)
            customer.changeAddress(address)
            customer.addRewardPoints(customerModel.rewardPoints)
            customerModel.active ? customer.activate() : customer.deactivate()
            return customer
        })
    }

}