import { Customer } from '../../customer/entity/customer';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { OrderService } from './order.service';

describe('Order service unit test', () => {
	it('Should place an order', () => {
		const customer = new Customer({ id: '1', name: 'Customer 1' });
		const item = new OrderItem({ id: '1', name: 'Item 1', price: 40, productId: 'p1', quantity: 2 });

		expect(OrderService.placeOrder(customer, [ item ]).total()).toBe(80);
		expect(customer.rewardPoints).toBe(40);

	});

	it('Should get total of all orders', () => {
		const item1 = new OrderItem({ id: '1', name: 'Item 1', price: 40, productId: 'p1', quantity: 2 });
		const item2 = new OrderItem({ id: '1', name: 'Item 1', price: 100, productId: 'p2', quantity: 1 });
		const order1 = new Order({ id: '123', customerId: '12456', items: [ item1 ] });

		const order2 = new Order({ id: '123', customerId: '12456', items: [ item1, item2 ] });

		expect(OrderService.total([ order1, order2 ])).toBe(260);
	});
});