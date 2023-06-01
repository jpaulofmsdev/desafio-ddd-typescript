import Order from "../entity/order";
import IRepository from "./repository.interface";

export default interface IOrderRepository extends IRepository<Order> {}