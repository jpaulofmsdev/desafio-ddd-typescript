import IRepository from "../../@shared/repository/repository.interface";
import Product from "../entity/product";

export default interface IProductRepository extends IRepository<Product> {
    
}