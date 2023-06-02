import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default class EventDispatcher implements IEventDispatcher {

    private eventHandlers: { [eventName: string]: IEventHandler<IEvent>[] } = {}
    getEventHandlers(eventName: string = undefined): IEventHandler<IEvent>[] {
        if(eventName === undefined) {
            return Object.values(this.eventHandlers).reduce((acc, curr) => acc.concat(curr), [])
        }
        return this.eventHandlers[eventName] || []
    }
    notify(event: IEvent): void {
        this.getEventHandlers(event.constructor.name).forEach(handler => handler.handle(event))
    }
    register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)
    }
    unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(eh => eh !== eventHandler)
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {}
    }

}