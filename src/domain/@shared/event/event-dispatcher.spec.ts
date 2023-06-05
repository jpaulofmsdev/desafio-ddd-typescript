import SendEmailWhenProductIsCreatedEventHandler from "../../product/event/handler/send-email-when-product-is-created.handler"
import ProductCreatedEvent from "../../product/event/product-created.event"
import EventDispatcher from "./event-dispatcher"

describe('EventDispatcher domain events tests', () => {

    it('should be able to register an event handler', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler()

        // Act
        eventDispatcher.register('ProductCreatedEvent', eventHandler)
        
        // Assert
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toBeDefined()
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent').length).toBe(1)
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([eventHandler])
    })

    it('should be able to unregister an event handler', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler()
        eventDispatcher.register('ProductCreatedEvent', eventHandler)
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([eventHandler])

        // Act
        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        // Assert
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([])
    })

    it('should be able to unregister all event handlers', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher()
        const eventHandler1 = new SendEmailWhenProductIsCreatedEventHandler()
        const eventHandler2 = new SendEmailWhenProductIsCreatedEventHandler()
        eventDispatcher.register('ProductCreatedEvent', eventHandler1)
        eventDispatcher.register('ProductCreatedEvent2', eventHandler2)
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([eventHandler1])
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent2')).toEqual([eventHandler2])
        expect(eventDispatcher.getEventHandlers().length).toBe(2)
        expect(eventDispatcher.getEventHandlers()).toEqual([eventHandler1, eventHandler2])

        // Act
        eventDispatcher.unregisterAll()

        // Assert
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([])
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent2')).toEqual([])
        expect(eventDispatcher.getEventHandlers()).toEqual([])
    })

    it('should notify an event to all its registered event handlers', () => {
        // Arrange
        const eventDispatcher = new EventDispatcher()
        const eventHandler1 = new SendEmailWhenProductIsCreatedEventHandler()
        const eventHandler2 = new SendEmailWhenProductIsCreatedEventHandler()
        const eventHandler3 = new SendEmailWhenProductIsCreatedEventHandler()
        eventDispatcher.register('ProductCreatedEvent', eventHandler1)
        eventDispatcher.register('ProductCreatedEvent', eventHandler2)
        eventDispatcher.register('OtherProductCreatedEvent', eventHandler3)
        expect(eventDispatcher.getEventHandlers('ProductCreatedEvent')).toEqual([eventHandler1, eventHandler2])
        expect(eventDispatcher.getEventHandlers('OtherProductCreatedEvent')).toEqual([eventHandler3])
        const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')
        const spyEventHandler3 = jest.spyOn(eventHandler3, 'handle')

        // Act
        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 100
        })
        eventDispatcher.notify(productCreatedEvent)

        // Assert
        expect(spyEventHandler1).toHaveBeenCalledTimes(1)
        expect(spyEventHandler1).toHaveBeenCalledWith(productCreatedEvent)
        expect(spyEventHandler2).toHaveBeenCalledTimes(1)
        expect(spyEventHandler2).toHaveBeenCalledWith(productCreatedEvent)
        expect(spyEventHandler3).toHaveBeenCalledTimes(0)
    })

})