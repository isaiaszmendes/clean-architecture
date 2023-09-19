import { Address } from '../../../../domain/customer/value-object/Address';
import { Customer } from '../../../../domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '../../../../domain/customer/repository/customer-repository-interface';
import { CustomerModel } from './customer.model';

/**
 * Aqui sim nós fazemos acoplamento de dependencias
 */
export class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			number: entity.address.number,
			zipCode: entity.address.zip,
			city: entity.address.city,
			active: entity.isActive(),
			rewardPoints: entity.rewardPoints,

		});
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address.street,
				number: entity.address.number,
				zipCode: entity.address.zip,
				city: entity.address.city,
				active: entity.isActive(),
				rewardPoints: entity.rewardPoints,
			},
			{
				where: {
					id: entity.id,
				}
			});
	}

	async find(id: string): Promise<Customer> {
		let customerModel;
		try {
			customerModel = await CustomerModel.findOne({
				where: {
					id,
				},
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error('Customer not found');
		}

		const customer = new Customer({ id, name: customerModel.name });
		const address = new Address({
			street: customerModel.street,
			number: customerModel.number,
			zip: customerModel.zipCode,
			city: customerModel.city
		});
		customer.changeAddress(address);
		customer.addRewardPoints(customerModel.rewardPoints);
		return customer;
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();

		return customerModels.map(customerModel => {
			const customer = new Customer({
				id: customerModel.id,
				name: customerModel.name
			});
			const address = new Address({
				street: customerModel.street,
				number: customerModel.number,
				city: customerModel.city,
				zip: customerModel.zipCode,
			});

			customer.addAddress(address);
			customer.addRewardPoints(customerModel.rewardPoints);

			return customer;
		});
	}
}
