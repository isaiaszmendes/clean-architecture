import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { CustomerValidatorFactory } from '../factory/customer.validator.factory';
import { Address } from '../value-object/Address';

export type CustomerProps = {
  id: string
  name: string
}

export class Customer extends Entity {
	private _name: string;
	private _address!: Address;
	private _active = false;
	private _rewardPoints = 0;

	constructor({ id, name }: CustomerProps) {
		super();
		this._id = id;
		this._name = name;
		this.validate();

		if (this.notification.hasErrors()) {
			throw new NotificationError(this.notification.getErrors());
		}
	}

	get name(): string {
		return this._name;
	}

	get address(): Address {
		return this._address;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}

	validate() {
		CustomerValidatorFactory.create().validator(this);
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	activate() {
		if (this._address === undefined) throw new Error('Address is mandatory to activate a customer');

		this._active = true;
	}

	deactivate(): void {
		this._active = false;
	}

	isActive() {
		return this._active;
	}

	addAddress(address: Address) {
		this._address = address;
	}

	changeAddress(address: Address) {
		this._address = address;
	}

	addRewardPoints(points: number): void {
		this._rewardPoints += points;
	}
}
