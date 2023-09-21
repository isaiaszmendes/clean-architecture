import { Sequelize } from 'sequelize-typescript';
import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';
import { UpdateCustomerUseCase } from './update.customer.usecase';
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/customer.repository';

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

describe('Integration Test update customer use case', () => {
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
	it('Should update a customer', async () => {
		const customerRepository = new CustomerRepository();
		await customerRepository.create(customer);
		const useCase = new UpdateCustomerUseCase(customerRepository);

		const output = await useCase.execute(input);
		expect(output).toEqual(input);
	});
});