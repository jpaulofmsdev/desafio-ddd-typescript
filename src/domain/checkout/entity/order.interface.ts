import IOrderItem from "./order_item.interface";

export default interface IOrder {
    get id(): string
    get customerId(): string
    get items(): IOrderItem[]
}