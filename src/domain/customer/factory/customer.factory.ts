import { Customer } from '../entity/customer';
import { randomUUID } from 'crypto';
import { Address } from '../value-object/Address';
interface CustomerFactoryProps {
  name: string
  address: Address
}

export class CustomerFactory {
	public static create({ name }: Pick<CustomerFactoryProps, 'name'>): Customer {
		return new Customer({ id: randomUUID(), name });
	}

	public static createWithAddress({ name, address }: CustomerFactoryProps): Customer {
		const customer = new Customer({ id: randomUUID(), name });
		customer.addAddress(address);
		return customer;
	}
}