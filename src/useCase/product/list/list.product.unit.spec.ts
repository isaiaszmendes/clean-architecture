import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ListProductUseCase } from './list.product.usecase';

const product1 = ProductFactory.create({ name: 'product1', price: 100 });
const product2 = ProductFactory.create({ name: 'product2', price: 200 });

const MockProductRepository = jest.fn(() => ({
	create: jest.fn(),
	update: jest.fn(),
	find: jest.fn(),
	findAll: jest.fn().mockResolvedValue(Promise.resolve([ product1, product2 ])),
}));

describe('Unit Test List Product', () => {
	it('should list all products', async () => {
		const productRepository = new MockProductRepository();
		const useCase = new ListProductUseCase(productRepository);

		const result = await useCase.execute({});

		expect(result.products.length).toEqual(2);
		expect(result.products[0].id).toEqual(product1.id);
		expect(result.products[0].name).toEqual(product1.name);
		expect(result.products[0].price).toEqual(product1.price);

		expect(result.products[1].id).toEqual(product2.id);
		expect(result.products[1].name).toEqual(product2.name);
		expect(result.products[1].price).toEqual(product2.price);

	});
});