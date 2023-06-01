import Product from "../entity/product";
import IRepository from "./repository.interface";

export default interface IProductRepository extends IRepository<Product> {
    
}