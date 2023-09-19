import { Address } from '../value-object/Address';
import { CustomerFactory } from './customer.factory';

describe('Customer factory unit test', () => {
	it('Should create a customer', () => {
		const customer = CustomerFactory.create({ name: 'Ana' });
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('Ana');
		expect(customer.address).toBeUndefined();
	});

	it('Should create a customer with an address', () => {
		const address = new Address({ street: '15 de Novembro street', number: 25, city: 'são paulo', zip: '08047-000' });
		const customer = CustomerFactory.createWithAddress({ name: 'Julia', address });

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('Julia');
		expect(customer.address).toBe(address);
	});
});