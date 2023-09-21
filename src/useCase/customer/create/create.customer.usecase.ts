import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customer-repository-interface';
import { Address } from '../../../domain/customer/value-object/Address';
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from './create.customer.dto';

export class CreateCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {

		const customer = CustomerFactory.createWithAddress({
			name: input.name,
			address: new Address(
				{
					street: input.address.street,
					city: input.address.city,
					number: input.address.number,
					zip: input.address.zip,
				}
			)
		});

		await this.customerRepository.create(customer);

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