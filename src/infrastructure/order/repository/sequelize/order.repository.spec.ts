import { Sequelize } from 'sequelize-typescript';
import { Order } from '../../../../domain/checkout/entity/order';
import { OrderItem } from '../../../../domain/checkout/entity/order-item';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Address } from '../../../../domain/customer/value-object/Address';
import { Product } from '../../../../domain/product/entity/product';
import { CustomerModel } from '../../../customer/repository/sequelize/customer.model';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';
import { ProductModel } from '../../../product/repository/sequelize/product.model';
import { ProductRepositorySequelize } from '../../../product/repository/sequelize/product.repository';
import { OrderItemModel } from './order-item.model';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repository';

describe('OrderRepository unit test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ CustomerModel, OrderModel, OrderItemModel, ProductModel ]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});

	it('should create a new Order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1267', name: 'John Smith' });
		const address = new Address({ street: 'Main St', zip: '12345678', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepositorySequelize();
		const product = new Product({ id: '95', name: 'Apple', price: 55 });
		await productRepository.create(product);

		const orderItem = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 10,
		});

		const order = new Order({ id: '123', customerId: customer.id, items: [ orderItem ] });
		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: [ 'items' ]
		});
		expect(orderModel.toJSON()).toStrictEqual({
			id: '123',
			customer_id: customer.id,
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					product_id: orderItem.productId,
					order_id: order.id,
				}
			]
		});
	});

	it('Should update an Order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '470', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepositorySequelize();
		const product = new Product({ id: '26', name: 'Mesa', price: 2000 });
		await productRepository.create(product);

		const orderItem1 = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});

		const orderRepository = new OrderRepository();
		const order = new Order({ id: '31', customerId: customer.id, items: [ orderItem1 ] });
		await orderRepository.create(order);
		const orderItem2 = new OrderItem({
			id: '2',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 1,
		});

		order.addItem(orderItem2);
		await orderRepository.update(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: [ 'items' ]
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: '31',
			customer_id: customer.id,
			total: order.total(),
			items: [
				{
					id: orderItem1.id,
					name: orderItem1.name,
					price: orderItem1.price,
					quantity: orderItem1.quantity,
					product_id: orderItem1.productId,
					order_id: order.id,
				},
				{
					id: orderItem2.id,
					name: orderItem2.name,
					price: orderItem2.price,
					quantity: orderItem2.quantity,
					product_id: orderItem2.productId,
					order_id: order.id,
				}
			]
		});
	});

	it('Should get an Order by id', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '470', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepositorySequelize();
		const product = new Product({ id: '26', name: 'Mesa', price: 2000 });
		await productRepository.create(product);

		const orderItem = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});

		const orderRepository = new OrderRepository();
		const order = new Order({ id: '31', customerId: customer.id, items: [ orderItem ] });

		await orderRepository.create(order);

		const foundOrder = await orderRepository.find(order.id);
		expect(foundOrder).toEqual(order);
	});

	it('Should throw an error when Order is not found', async () => {
		const orderRepository = new OrderRepository();

		expect(async() => {
			await orderRepository.find('1');
		}).rejects.toThrow('Order not found');
	});

	it('Should get all Orders', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '4', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepositorySequelize();
		const product = new Product({ id: '27', name: 'cadeira', price: 1200 });
		await productRepository.create(product);

		const orderItem1 = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});
		const orderRepository = new OrderRepository();
		const order1 = new Order({ id: '134', customerId: customer.id, items: [ orderItem1 ] });

		await orderRepository.create(order1);
		const orderItem2 = new OrderItem({
			id: '2',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 2,
		});

		const order2 = new Order({ id: '135', customerId: customer.id, items: [  orderItem2 ] });
		await orderRepository.create(order2);

		const ordersFonded = await orderRepository.findAll();

		expect(ordersFonded).toEqual([ order1, order2 ]);

	});
});