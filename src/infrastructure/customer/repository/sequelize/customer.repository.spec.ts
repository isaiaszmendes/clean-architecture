import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Address } from '../../../../domain/customer/value-object/Address';
import { CustomerModel } from './customer.model';

import { CustomerRepository } from './customer.repository';

describe('Customer repository test', () => {
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
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);

		await customerRepository.create(customer);
		const customerModel = await CustomerModel.findOne({ where: { id: '1' }});
		expect(customerModel.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			street: address.street,
			number: address.number,
			city: address.city,
			zipCode: address.zip,
			rewardPoints: customer.rewardPoints,
			active: customer.isActive(),
		});
	});

	it('Should update a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);

		await customerRepository.create(customer);
		customer.changeName('Isaias');
		await customerRepository.update(customer);
		const customerModel = await CustomerModel.findOne({ where: { id: '1' }});

		expect(customerModel.toJSON()).toStrictEqual({
			id: customer.id,
			name: customer.name,
			street: address.street,
			number: address.number,
			city: address.city,
			zipCode: address.zip,
			rewardPoints: customer.rewardPoints,
			active: customer.isActive(),
		});
	});

	it('Should find a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const foundCustomer = await customerRepository.find(customer.id);

		expect(foundCustomer).toStrictEqual(customer);
	});

	it('Should throw an error when customer is not found', async () => {
		const customerRepository = new CustomerRepository();

		expect(async() => {
			await customerRepository.find('1');
		}).rejects.toThrow('Customer not found');
	});

	it('Should find all customers', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);

		await customerRepository.create(customer);

		const customer2 = new Customer({ id: '2', name: 'Cliente 2' });
		const address2 = new Address({  street: 'Av Don Adão', number: 5, city: 'São Paulo', zip: '82467885' });
		customer2.addAddress(address2);

		await customerRepository.create(customer2);

		const foundCustomers = await customerRepository.findAll();
		const customers = [ customer, customer2 ];

		expect(customers.length).toBe(2);
		expect(customers).toEqual(foundCustomers);
	});

});