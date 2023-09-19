
import { OrderItem } from '../entity/order-item';
import { randomUUID } from 'crypto';
import { Customer } from '../../customer/entity/customer';
import { Order } from '../entity/order';

export class OrderService {
	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		if (items.length === 0) {
			throw new Error('Order must have at least one item');
		}

		const order = new Order({ id: randomUUID(), items, customerId: customer.id });
		customer.addRewardPoints(order.total() / 2);
		return order;
	}

	static total(orders: Order[]): number {
		return orders.reduce((acc, order) => acc + order.total(), 0);
	}
}