import IEventHandler from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogWhenCustomerAddressIsChangedEventHandler implements IEventHandler<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent) {
        console.log(`Customer Address: ${event.eventData.id}, ${event.eventData.name} changed to ${event.eventData.address}`)
    }
}