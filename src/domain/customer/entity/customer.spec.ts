import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLogWhenCustomerAddressIsChangedEventHandler from "../event/handler/send-console-log-when-customer-address-is-changed.handler";
import Address from "../value-object/address";
import Customer from "./customer";

describe('Customer unit tests', () => {

    it('should throw error when Id is empty', () => {
        expect(() => {
            new Customer('', 'John')
        }).toThrowError('Id is required')
    })

    it('should throw error when Name is empty', () => {
        expect(() => {
            new Customer('123', '')
        }).toThrowError('Name is required')
    })

    it('should change Name', () => {
        // Arrange
        const customer = new Customer('123', 'John')

        // Act
        customer.changeName('Jane')

        // Assert
        expect(customer.name).toBe('Jane')
    })

    it('should activate customer', () => {
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 123, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it('should deactivate customer', () => {
        const customer = new Customer('1', 'Customer 1')
        const address = new Address('Street 1', 123, 'Zipcode 1', 'City 1')
        customer.changeAddress(address)
        customer.activate()
        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it('should throw error when activating and address is undefined', () => {
        expect(() => {
            const customer = new Customer('1', 'Customer 1')
            customer.activate()
        }).toThrowError('Address is mandatory to activate a customer')
    })

    it('should add reward points', () => {
        const customer = new Customer('1', 'Customer 1')
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })

    it('should notify when changing address', () => {
        // Arrange
        const eventHandler = new SendConsoleLogWhenCustomerAddressIsChangedEventHandler()
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')
        const eventDispatcher = new EventDispatcher()
        eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)
        const customer = new Customer('1', 'Customer 1', new Address('Street 1', 123, 'Zipcode 1', 'City 1'), eventDispatcher)

        expect(spyEventHandler).toHaveBeenCalledTimes(0)

        // Act
        customer.changeAddress(new Address('Street 2', 234, 'Zipcode 2', 'City 2'))

        // Assert
        expect(spyEventHandler).toHaveBeenCalledTimes(1)
    })

})