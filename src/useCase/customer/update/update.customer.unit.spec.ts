import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';
import { UpdateCustomerUseCase } from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress({
	name: 'John',
	address: new Address({
		street: 'Rua 1',
		city: 'Cidade 1',
		number: 1,
		zip: '00000-000',
	})
});

const input = {
	id: customer.id,
	name: 'John Doe updated',
	address: {
		street: 'Rua 2',
		city: 'Cidade 2',
		number: 2,
		zip: '11111-111',
	}
};

const MockRepository = () => {
	return {
		create: jest.fn(),
		findAll: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(customer)),
		update: jest.fn(),
	};
};

describe('Test update customer use case', () => {
	it('Should update a customer', async () => {
		const customerRepository = MockRepository();
		const useCase = new UpdateCustomerUseCase(customerRepository);

		const output = await useCase.execute(input);
		expect(output).toEqual(input);
	});
});