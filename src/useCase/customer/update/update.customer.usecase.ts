import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository-interface';
import { Address } from '../../../domain/customer/value-object/Address';
import { InputUpdateCustomerDTO } from './update.customer.dto';

export class UpdateCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute(input: InputUpdateCustomerDTO): Promise<InputUpdateCustomerDTO> {
		const customer = await this.customerRepository.find(input.id);
		customer.changeName(input.name);
		customer.changeAddress(new Address({
			street: input.address.street,
			city: input.address.city,
			number: input.address.number,
			zip: input.address.zip,
		}));

		await this.customerRepository.update(customer);

		return {
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.address.street,
				city: customer.address.city,
				number: customer.address.number,
				zip: customer.address.zip,
			}
		};
	}
}