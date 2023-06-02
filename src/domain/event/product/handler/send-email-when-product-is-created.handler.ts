import IEventHandler from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedEventHandler implements IEventHandler<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email to ...`)
    }
}