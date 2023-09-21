import { CreateCustomerUseCase } from './create.customer.usecase';

const input = {
	name: 'Cliente 1',
	address: {
		street: 'Av Dona Eva',
		city: 'São Paulo',
		number: 20,
		zip: '74586421',
	},
};

const MockRepository = () => {
	return {
		find: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test create customer use case', () => {
	it('Should create a customer', async () => {
		const customerRepository = MockRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		const output = await useCase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			address: {
				street: input.address.street,
				city: input.address.city,
				number: input.address.number,
				zip: input.address.zip,
			},
		});
	});

	it('should throw an error when name is missing', async () => {
		const customerRepository = MockRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		input.name = '';

		await expect(useCase.execute(input)).rejects.toThrow('Name is required');
	});

	it('should throw an error when street is missing', async () => {
		const customerRepository = MockRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		input.address.street = '';

		await expect(useCase.execute(input)).rejects.toThrow('Street is required');
	});
});