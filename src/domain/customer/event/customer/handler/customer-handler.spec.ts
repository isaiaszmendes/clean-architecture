
import { Customer } from '../../../entity/customer';
import { Address } from '../../../value-object/Address';
import { CustomerCreatedEvent } from '../customer-created.event';
import { SendLogWhenCustomerAddressIsChangeHandler } from './send-log-when-customer-address-is-changed.hndlers';
import { SendLog2WhenCustomerIsCreatedHandler } from './send-log2-when-customer-is-created.handler';

describe('Customer Handler Unit Tests', () => {
	let spyInstanceLog: any;

	beforeEach(() => {
		spyInstanceLog = jest.spyOn(console, 'log');
	});

	afterEach(() => {
		spyInstanceLog.mockRestore();
	});

	test('Send Log When Customer Is Created Handler', () => {
		const customer = new Customer({ id: '1', name: 'Mendes' });
		const customerCreatedEvent = new CustomerCreatedEvent(customer);

		new SendLog2WhenCustomerIsCreatedHandler().handle(customerCreatedEvent);

		expect(spyInstanceLog).toHaveBeenCalled();
		expect(spyInstanceLog).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
	});

	test('Send 2º Log When Customer Is Created Handler', () => {
		const customer = new Customer({ id: '1', name: 'Mendes' });
		const customerCreatedEvent = new CustomerCreatedEvent(customer);

		new SendLog2WhenCustomerIsCreatedHandler().handle(customerCreatedEvent);

		expect(spyInstanceLog).toHaveBeenCalled();
		expect(spyInstanceLog).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
	});

	test('Send Email When Customer Address Is Changed Handler', () => {
		const customer = new Customer({ id: '1', name: 'Mendes' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.changeAddress(address);
		const customerCreatedEvent = new CustomerCreatedEvent({
			id: customer.id,
			name: customer.name,
			address: Object.values(customer.address).join(', '),
		});

		new SendLogWhenCustomerAddressIsChangeHandler().handle(customerCreatedEvent);

		expect(spyInstanceLog).toHaveBeenCalled();
		expect(spyInstanceLog).toHaveBeenCalledWith(
			`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: Av Dona Eva, 20, 74586421, São Paulo`,
		);
	});
});