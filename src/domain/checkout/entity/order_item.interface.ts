export default interface IOrderItem {
    get id(): string;
    get name(): string;
    get productId(): string;
    get quantity(): number;
    get price(): number;
}