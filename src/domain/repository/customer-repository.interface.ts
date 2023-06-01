import Customer from "../entity/customer";
import IRepository from "./repository.interface";

export default interface ICustomerRepository extends IRepository<Customer> {}