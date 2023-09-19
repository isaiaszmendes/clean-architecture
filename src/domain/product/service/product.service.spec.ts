
import { Product } from '../entity/product';
import { ProductService } from './product.service';

describe('Product service unit tests', () => {
	it('should change the prices of all products', () => {
		const product1 = new Product({ id: '123', name: 'Product1', price: 100 });
		const product2 = new Product({ id: '123', name: 'Product2', price: 1240 });
		const product3 = new Product({ id: '123', name: 'Product3', price: 120 });

		const products = [ product1, product2, product3 ];

		ProductService.increasePrice(products, 20);

		expect(product1.price).toBe(120);
		expect(product2.price).toBe(1488);
		expect(product3.price).toBe(144);
	});
});