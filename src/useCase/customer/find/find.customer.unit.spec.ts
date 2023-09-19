import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/Address';
import { FindCustomerUseCase } from './find.customer.usecase';

const customer = new Customer({ id: '1', name: 'Cliente 1' });
const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
customer.addAddress(address);

const MockRepository = () => {
	return {
		find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};

describe('Unit Test find customer use case', () => {

	it('Should find a customer', async () => {
		const customerRepository = MockRepository();
		const useCase = new FindCustomerUseCase(customerRepository);

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