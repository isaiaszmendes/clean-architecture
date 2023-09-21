import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../../domain/product/entity/product';

import { ProductModel } from './product.model';

import { ProductRepository } from './product.repository';

describe('ProductRepository unit test', () => {
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

	it('Should create a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product({ id: '1', name: 'Produto 1', price: 100 });

		await productRepository.create(product);
		const productModel = await ProductModel.findOne({ where: { id: '1' }});
		expect(productModel.toJSON()).toStrictEqual({
			id: '1', name: 'Produto 1', price: 100,
		});
	});

	it('Should update a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product({ id: '1', name: 'Produto 1', price: 100 });

		await productRepository.create(product);
		const productModel = await ProductModel.findOne({ where: { id: '1' }});
		expect(productModel.toJSON()).toStrictEqual({
			id: '1', name: 'Produto 1', price: 100,
		});

		product.changeName('Livro');
		product.changePrice(150);

		await productRepository.update(product);
		const productModel2 = await ProductModel.findOne({ where: { id: '1' }});
		expect(productModel2.toJSON()).toStrictEqual({
			id: '1', name: 'Livro', price: 150,
		});
	});

	it('Should find a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product({ id: '1', name: 'Produto 1', price: 100 });

		await productRepository.create(product);
		const productModel = await ProductModel.findOne({ where: { id: '1' }});
		expect(productModel.toJSON()).toStrictEqual({
			id: '1', name: 'Produto 1', price: 100,
		});
		const foundProduct = await productRepository.find('1');

		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		});
	});

	it('Should find all products', async () => {
		const productRepository = new ProductRepository();
		const product = new Product({ id: '1', name: 'Produto 1', price: 100 });

		await productRepository.create(product);

		const product2 = new Product({ id: '2', name: 'Produto 2', price: 200 });

		await productRepository.create(product2);

		const foundProducts = await productRepository.findAll();
		const products = [ product, product2 ];

		expect(products.length).toBe(2);
		expect(products).toEqual(foundProducts);
	});

});