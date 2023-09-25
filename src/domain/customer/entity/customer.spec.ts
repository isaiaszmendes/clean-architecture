
import { Address } from '../value-object/Address';
import { Customer } from './customer';

describe('custormer unit test', () => {
	it('should throw an error when id is empty', () => {
		expect(() => {
			new Customer({ id: '', name: 'isaias' });
		}).toThrowError('customer: Id is required');
	});

	it('should throw an error when name is empty', () => {
		expect(() => {
			new Customer({ id: '123456', name: '' });
		}).toThrowError('customer: Name is required');
	});

	it('should throw an error when id and name are empty', () => {
		expect(() => {
			new Customer({ id: '', name: '' });
		}).toThrowError('customer: Id is required,customer: Name is required');
	});

	it('should change name', () => {
		// arrange
		const customer = new Customer({ id: '123456', name: 'kathlyn' });

		// Act
		customer.changeName('Kathlyn Mendes');

		// Assert
		expect(customer.name).toBe('Kathlyn Mendes');
	});

	it('should throw an error when address is undefined when you active customer', () => {

		expect(() => {
			const customer = new Customer({ id: '123456', name: 'kathlyn' });
			customer.activate();
		}).toThrowError('Address is mandatory to activate a customer');
	});

	it('should activate customer', () => {
		const customer = new Customer({ id: '123456', name: 'kathlyn' });
		const address = new Address({ street: 'Strret joao', number: 25, city: 'são paulo', zip: '08047-000' });

		customer.addAddress(address);
		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it('should deactivate customer', () => {
		const customer = new Customer({ id: '123456', name: 'kathlyn' });

		customer.deactivate();

		expect(customer.isActive()).toBe(false);
	});

	it('should add reward points', () => {
		const customer = new Customer({ id: '1', name: 'Customer 1' });
		expect(customer.rewardPoints).toBe(0);
		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(20);
		expect(customer.rewardPoints).toBe(30);
	});
});
