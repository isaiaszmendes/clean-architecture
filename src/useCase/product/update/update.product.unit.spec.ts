import { Sequelize } from 'sequelize-typescript';
import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product.model';
import { UpdateProductUseCase } from './update.product.usecase';

const product = ProductFactory.create({ name: 'Product 1', price: 10 });

const input = {
	id: product.id,
	name: 'Product 2',
	price: 20,
};

const output = {
	id: product.id,
	name: 'Product 2',
	price: 20,
};

const MockProductRepository = jest.fn(() => ({
	create: jest.fn(),
	update: jest.fn(),
	find: jest.fn().mockReturnValue(product),
	findAll: jest.fn(),
}));

describe('Unit Test Find Product', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ ProductModel ]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});
	it('should find a product', async () => {
		const productRepository = new MockProductRepository();
		const useCase = new UpdateProductUseCase(productRepository);

		const result = await useCase.execute(input);

		expect(result).toEqual(output);
	});
});