import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/customer.model';
import { CreateCustomerUseCase } from './create.customer.usecase';
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/customer.repository';

const input = {
	name: 'Cliente 1',
	address: {
		street: 'Av Dona Eva',
		city: 'São Paulo',
		number: 20,
		zip: '74586421',
	},
};

describe('Integration Test create customer use case', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ CustomerModel ]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});

	it('Should create a customer', async () => {
		const customerRepository = new CustomerRepository();
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
		const customerRepository = new CustomerRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		input.name = '';

		await expect(useCase.execute(input)).rejects.toThrow('Name is required');
	});

	it('should throw an error when street is missing', async () => {
		const customerRepository = new CustomerRepository();
		const useCase = new CreateCustomerUseCase(customerRepository);

		input.address.street = '';

		await expect(useCase.execute(input)).rejects.toThrow('Street is required');
	});
});