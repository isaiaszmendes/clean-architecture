import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/Address';
import { FindCustomerUseCase } from './find.customer.usecase';

describe('Test find customer use case', () => {
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

	it('Should find a customer', async () => {
		const customerRepository = new CustomerRepository();
		const useCase = new FindCustomerUseCase(customerRepository);
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);
		await customerRepository.create(customer);

		// Agora vamos testar o use case
		const input = { id: '1' };

		const output = {
			id: '1',
			name: 'Cliente 1',
			address: {
				street: 'Av Dona Eva',
				city: 'São Paulo',
				number: 20,
				zip: '74586421'
			}
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(output);
	});

});