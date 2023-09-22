import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository';
import { FindProductUseCase } from './find.product.usecase';
import { ProductFactory } from '../../../domain/product/factory/product.factory';

const product = ProductFactory.create({ name: 'Product 1', price: 10 });

const input = {
	id: product.id,
};

const output = {
	id: product.id,
	name: product.name,
	price: product.price,
};

describe('Integration Test Find Product', () => {
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
		const productRepository = new ProductRepository();
		await productRepository.create(product);

		const useCase = new FindProductUseCase(productRepository);

		const result = await useCase.execute(input);

		expect(result).toEqual(output);
	});
});