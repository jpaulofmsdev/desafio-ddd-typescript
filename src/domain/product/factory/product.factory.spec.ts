import ProductFactory from "./product.factory"

describe('Product Factory unit test', () => {
    
    it('should create a product type a', () => {
        const product = ProductFactory.create('A', 'Product A', 100)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product A')
        expect(product.price).toBe(100)
        expect(product.constructor.name).toBe('Product')
    })

    it('should create a product type b', () => {
        const product = ProductFactory.create('B', 'Product B', 200)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product B')
        expect(product.price).toBe(400)
        expect(product.constructor.name).toBe('ProductB')
    })

    it('should throw an error when create a product type not supported', () => {
        expect(() => {
            ProductFactory.create('C', 'Product C', 200)
        }).toThrowError('Product type not supported')
    })
})