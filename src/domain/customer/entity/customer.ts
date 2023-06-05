import IEventDispatcher from "../../@shared/event/event-dispatcher.interface"
import CustomerAddressChangedEvent from "../event/customer-address-changed.event"
import Address from "../value-object/address"
import ICustomer from "./customer.interface"

export default class Customer implements ICustomer{

    private _eventDispatcher: IEventDispatcher

    private _id: string
    private _name: string = ""
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string, address?: Address, eventDispatcher?: IEventDispatcher) {
        this._id = id
        this._name = name
        this.validate()
        if(address) {
            this.changeAddress(address)
        }
        if(eventDispatcher) {
            this._eventDispatcher = eventDispatcher
        }
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get Address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    validate() {
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address
        if(this._eventDispatcher) {
            this._eventDispatcher.notify(new CustomerAddressChangedEvent({id: this.id, name: this.name, address: this.Address.toString()}))
        }
    }

    isActive(): boolean {
        return this._active
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

}