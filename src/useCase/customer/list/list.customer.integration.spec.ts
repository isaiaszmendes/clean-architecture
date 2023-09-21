import { Sequelize } from 'sequelize-typescript';
import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import { ListCustomerUseCase } from './list.customer.usecase';
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/customer.model';

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

describe('Integration Test list customers use case', () => {
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
	it('Should list a customer', async () => {
		const customerRepository = new CustomerRepository();
		await customerRepository.create(customer1);
		await customerRepository.create(customer2);

		const useCase = new ListCustomerUseCase(customerRepository);

		const output = await useCase.execute({});
		expect(output.customers.length).toEqual(2);
		expect(output.customers[0].id).toEqual(customer1.id);
		expect(output.customers[0].name).toEqual(customer1.name);
		expect(output.customers[0].address.street).toEqual(customer1.address.street);

		expect(output.customers[1].id).toEqual(customer2.id);
		expect(output.customers[1].name).toEqual(customer2.name);
		expect(output.customers[1].address.street).toEqual(customer2.address.street);
	});
});