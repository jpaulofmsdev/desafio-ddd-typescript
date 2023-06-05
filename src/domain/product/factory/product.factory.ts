import Product from "../entity/product";
import ProductB from "../entity/product-b";
import IProduct from "../entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
    static create(type: string, name: string, price: number): IProduct {
        switch (type) {
            case 'A':
                return new Product(uuid(), name, price)
            case 'B':
                return new ProductB(uuid(), name, price)
            default:
                throw new Error('Product type not supported')
        }
    }
}