import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import IOrderRepository from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements IOrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                total: item.calculateTotal()
            }))
        },
            {
                include: [{
                    model: OrderItemModel,
                    as: "items"
                }]
            })
    }
    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize
        await sequelize.transaction(async (trx) => {
            await OrderItemModel.destroy({
                where: {
                    orderId: entity.id
                },
                transaction: trx
            })

            const orderItems = entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                total: item.calculateTotal(),
                orderId: entity.id
            }))
            await OrderItemModel.bulkCreate(orderItems,
                {
                    transaction: trx
                })

            await OrderModel.update({
                customerId: entity.customerId,
                total: entity.total(),
            },
                {
                    where: {
                        id: entity.id
                    },
                    transaction: trx
                })
        })
    }
    async find(id: string): Promise<Order> {
        try {
            const model = await OrderModel.findByPk(id, {
                include: [{
                    model: OrderItemModel,
                    as: "items"
                }],
                rejectOnEmpty: true
            })

            return new Order(model.id, model.customerId, model.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)))
        } catch (err) {
            throw new Error('Order not found')
        }
    }
    async findAll(): Promise<Order[]> {
        const models = await OrderModel.findAll({
            include: [{
                model: OrderItemModel,
                as: "items"
            }]
        })

        return models.map(model => new Order(model.id, model.customerId, model.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))))
    }

}