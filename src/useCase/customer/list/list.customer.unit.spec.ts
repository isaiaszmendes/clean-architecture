import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';
import { ListCustomerUseCase } from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress({
	name: 'John Doe',
	address: new Address({
		street: 'Rua 1',
		city: 'Cidade 1',
		number: 1,
		zip: '00000-000',
	})
});

const customer2 = CustomerFactory.createWithAddress({
	name: 'Jane Smith',
	address: new Address({
		street: '456 Elm St',
		city: 'Anytown',
		number: 5,
		zip: '12345-678',
	}),
});

const MockRepository = () => {
	return {
		create: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve(
			[ customer1, customer2 ]
		)),
		find: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test list customers use case', () => {
	it('Should list a customer', async () => {
		const customerRepository = MockRepository();
		const useCase = new ListCustomerUseCase(customerRepository);

		const output = await useCase.execute();
		expect(output.customers.length).toEqual(2);
		expect(output.customers[0].id).toEqual(customer1.id);
		expect(output.customers[0].name).toEqual(customer1.name);
		expect(output.customers[0].address.street).toEqual(customer1.address.street);

		expect(output.customers[1].id).toEqual(customer2.id);
		expect(output.customers[1].name).toEqual(customer2.name);
		expect(output.customers[1].address.street).toEqual(customer2.address.street);

	});
});