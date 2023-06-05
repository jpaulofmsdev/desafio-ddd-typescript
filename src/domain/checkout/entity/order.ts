import IOrder from "./order.interface"
import OrderItem from "./order_item"

export default class Order implements IOrder{

    private _id: string
    private _customerId: string
    private _items: OrderItem[] = []

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required")
        }
        if (this._items.length === 0) {
            throw new Error("Items is required")
        }
        return true
    }

    addItem(item: OrderItem): void {
        if (item.validate()) {
            this._items.push(item)
        }
        this.validate()
    }

    changeItem(id: string, item: OrderItem): void {
        const index = this._items.findIndex(i => i.id === id)
        if (item.validate() && index >= 0) {
            this._items[index] = item
        }
        this.validate()
    }

    changeCustomer(customerId: string): void {
        this._customerId = customerId
        this.validate()
    }
    total(): number {
        return this._items.reduce((acc, item) => acc + item.calculateTotal(), 0)
    }
}