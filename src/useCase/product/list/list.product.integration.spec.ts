import { Sequelize } from 'sequelize-typescript';
import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository';
import { ListProductUseCase } from './list.product.usecase';

const product1 = ProductFactory.create({ name: 'product1', price: 100 });
const product2 = ProductFactory.create({ name: 'product2', price: 200 });


describe('Unit Test List Product', () => {
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
	it('should list all products', async () => {
		const productRepository = new ProductRepository();
		await productRepository.create(product1);
		await productRepository.create(product2);
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