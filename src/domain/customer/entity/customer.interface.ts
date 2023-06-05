import IAddress from "./address.interface";

export default interface ICustomer {
    get id(): string
    get name(): string
    get Address(): IAddress
    changeAddress(address: IAddress): void
}