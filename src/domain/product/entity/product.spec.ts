import { Product } from './product';

describe('Product unit test', () => {
	it('should throw an error when id is empty', () => {
		expect(() => {
			new Product({ id: '', name: 'Product 1', price: 10 });
		}).toThrowError('product: Id is required');
	});

	it('should throw an error when name is empty', () => {
		expect(() => {
			new Product({ id: '123', name: '', price: 10 });
		}).toThrowError('product: Name is required');
	});

	it('should throw an error when id and name are empty', () => {
		expect(() => {
			new Product({ id: '', name: '', price: 10 });
		}).toThrowError('product: Id is required,product: Name is required');
	});

	it('should throw an error when id and name are empty and price is less than zero', () => {
		expect(() => {
			new Product({ id: '', name: '', price: -1 });
		}).toThrowError('product: Id is required,product: Name is required,product: Price must be greater than zero');
	});

	it('should throw an error when price is less than zero', () => {
		expect(() => {
			new Product({ id: '123', name: 'produto1', price: -1 });
		}).toThrowError('product: Price must be greater than zero');
	});

	it('should change name', () => {
		const product = new Product({ id: '123', name: 'produto1', price: 10 });

		product.changeName('Produto 2');

		expect(product.name).toBe('Produto 2');
	});

	it('should change price', () => {
		const product = new Product({ id: '123', name: 'produto1', price: 10 });

		product.changePrice(20);

		expect(product.price).toBe(20);
	});

});
