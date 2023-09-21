import { FindProductUseCase } from './find.product.usecase';

const input = {
	id: '1'
};

const output = {
	id: '1',
	name: 'Product 1',
	price: 10,
};

const MockRepository = () => ({
	create: jest.fn(),
	update: jest.fn(),
	find: jest.fn().mockResolvedValue(Promise.resolve(output)),
	findAll: jest.fn(),
});

describe('Unit Test Find Product', () => {
	it('should find a product', async () => {
		const productRepository = MockRepository();
		const useCase = new FindProductUseCase(productRepository);

		const result = await useCase.execute(input);

		expect(result).toEqual(output);
	});
});