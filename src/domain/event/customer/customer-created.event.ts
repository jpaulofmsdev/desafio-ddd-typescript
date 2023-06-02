import IEvent from "../@shared/event.interface";

export default class CustomerCreatedEvent implements IEvent {
    dataTimeOccurred: Date
    eventData: any

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date()
        this.eventData = eventData
    }
}