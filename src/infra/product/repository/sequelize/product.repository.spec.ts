import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/product/entity/product"

describe('ProductRepository test', () => {
    
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            ProductModel
        ])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({
            where: {
                id: product.id
            }
        })

        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 10
        })
    })

    it('should update a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)

        
        product.changeName('Product 2')
        product.changePrice(20)
        await productRepository.update(product)

        const productModel = await ProductModel.findOne({
            where: {
                id: product.id
            }
        })

        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 2',
            price: 20
        })
    })

    it('should find a product', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            price: 10
        })
        
        const productRepository = new ProductRepository()
        const product = await productRepository.find('1')

        expect(product).toStrictEqual(new Product('1', 'Product 1', 10))

    })

    it('should find all products', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            price: 10
        })

        await ProductModel.create({
            id: '2',
            name: 'Product 2',
            price: 20
        })
        
        const productRepository = new ProductRepository()
        const products = await productRepository.findAll()

        expect(products).toHaveLength(2)
        expect(products[0]).toStrictEqual(new Product('1', 'Product 1', 10))
        expect(products[1]).toStrictEqual(new Product('2', 'Product 2', 20))
    })
})