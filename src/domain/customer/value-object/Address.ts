import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { AddressValidatorFactory } from '../factory/address.factory';

export type AddressProps = {
  street: string;
  number: number;
  zip: string;
  city: string;
}

export class Address extends Entity{
	private _street: string;
	private _number: number;
	private _zip: string;
	private _city: string;

	constructor({ street, number, zip, city }: AddressProps) {
		super();
		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city =  city;
		this.validate();

		if (this.notification.hasErrors()) {
			throw new NotificationError(this.notification.getErrors());
		}
	}

	validate() {
		AddressValidatorFactory.create().validator(this);
	}

	get	street(): string {
		return this._street;
	}

	get	number(): number {
		return this._number;
	}

	get	zip(): string {
		return this._zip;
	}

	get	city(): string {
		return this._city;
	}
}