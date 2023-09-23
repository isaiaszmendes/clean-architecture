import { app, sequelize } from '../fastify';
import request from 'supertest';

const mockProduct = {
	name: 'product 1',
	price: 10,
};

const mockProduct2 = {
	name: 'product 2',
	price: 20,
};

describe('E2E Test for Product', () => {
	beforeEach(async () => {
		await app.ready();
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a Product', async () => {
		const response = await request(app.server)
			.post('/product')
			.send(mockProduct);

		expect(response.status).toBe(201);
		expect(response.body.name).toBe('product 1');
		expect(response.body.price).toBe(10);
	});

	it('should not create a Product with invalid data', async () => {
		const response = await request(app.server)
			.post('/product')
			.send({
				name: 'product 1',
			});

		expect(response.status).toBe(500);
	});

	it('should get all products', async () => {
		const response = await request(app.server).post('/product').send(mockProduct);
		const response2 = await request(app.server).post('/product').send(mockProduct2);
		expect(response.status).toBe(201);
		expect(response2.status).toBe(201);

		const productResponse = await request(app.server).get('/product');
		expect(productResponse.status).toBe(200);
		expect(productResponse.body.products.length).toBe(2);
		expect(productResponse.body.products[0].name).toBe('product 1');
		expect(productResponse.body.products[0].price).toBe(10);
		expect(productResponse.body.products[1].name).toBe('product 2');
		expect(productResponse.body.products[1].price).toBe(20);
	});

	it('should get a product by id', async () => {
		const response = await request(app.server).post('/product').send(mockProduct);
		expect(response.status).toBe(201);
		expect(response.body.id).toBeDefined();

		const responseProduct = await request(app.server)
			.get(`/product/${response.body.id}`);

		expect(responseProduct.status).toBe(200);
		expect(responseProduct.body.name).toBe('product 1');
		expect(responseProduct.body.price).toBe(10);
	});
});