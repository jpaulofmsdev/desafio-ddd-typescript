import IAddress from "../entity/address.interface";
import Customer from "../entity/customer";
import ICustomer from "../entity/customer.interface";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
    static create(name: string): ICustomer {
        return new Customer(uuid(), name)
    }

    static createWithAddress(name: string, address: IAddress): ICustomer {
        const customer = this.create(name)
        customer.changeAddress(address)
        return customer
    }
}