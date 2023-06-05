import IEventHandler from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLog1WhenCustomerIsCreatedEventHandler implements IEventHandler<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent) {
        console.log('This is the first console.log from event: CustomerCreatedEvent')
    }
}