export default interface IAddress {
    get street(): string;
    get number(): number;
    get zip(): string;
    get city(): string;
}