import Customer from "../entity/customer";
import IRepository from "../../@shared/repository/repository.interface";

export default interface ICustomerRepository extends IRepository<Customer> {}