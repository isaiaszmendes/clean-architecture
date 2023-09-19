import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number
  }[]
}

export class OrderFactory {
	public static create({ id, customerId, items: orderItems }: OrderFactoryProps): Order {
		const items = orderItems.map((item) => {
			return new OrderItem({
				id: item.id,
				name: item.name,
				price: item.price,
				productId: item.productId,
				quantity: item.quantity,
			});
		});
		return new Order({ id, customerId, items });
	}
}