import { EventInterface } from '../../../@shared/event/event.interface';

export class CustomerCreatedEvent implements EventInterface {
	dateTimeOcurred: Date;
	eventData: any;

	constructor(eventData: any) {
		this.eventData = eventData;
		this.dateTimeOcurred = new Date();
	}
}