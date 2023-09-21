import { Sequelize } from 'sequelize-typescript';
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from './create.product.usecase';
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product.model';

const input = {
	name: 'Product 1',
	price: 10,
};


describe('Integration Test Create Product', () => {
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
	it('should create a product', async () => {
		const productRepository = new ProductRepository();
		const useCase = new CreateProductUseCase(productRepository);

		const output = await useCase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			price: input.price,
		});

	});
});