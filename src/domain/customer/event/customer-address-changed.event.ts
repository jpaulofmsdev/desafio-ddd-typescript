import IEvent from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements IEvent{
    dataTimeOccurred: Date;
    eventData: any;
    
    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}