import { app, sequelize } from '../fastify';
import request from 'supertest';

const mockCustomer = {
	name: 'John Doe',
	address: {
		street: 'Main Street',
		number: 123,
		city: 'New York',
		zip: '12345-678',
	}
};

const mockCustomer2 = {
	name: 'Sarah Green',
	address: {
		street: 'St Paul Street',
		number: 546,
		city: 'New York',
		zip: '54321-952',
	}
};

describe('E2E Test for Customer', () => {
	beforeEach(async () => {
		await app.ready();
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a customer', async () => {
		const response = await request(app.server)
			.post('/customer')
			.send(mockCustomer);

		expect(response.status).toBe(201);
		expect(response.body.name).toBe('John Doe');
		expect(response.body.address.street).toBe('Main Street');
		expect(response.body.address.number).toBe(123);
		expect(response.body.address.city).toBe('New York');
		expect(response.body.address.zip).toBe('12345-678');
	});

	it('should not create a customer with invalid data', async () => {
		const response = await request(app.server)
			.post('/customer')
			.send({
				name: 'John Doe',
			});

		expect(response.status).toBe(500);
	});

	it('should get all customers', async () => {
		const response = await request(app.server).post('/customer').send(mockCustomer);
		const response2 = await request(app.server).post('/customer').send(mockCustomer2);
		expect(response.status).toBe(201);
		expect(response2.status).toBe(201);

		const customerResponse = await request(app.server).get('/customer');
		expect(customerResponse.status).toBe(200);
		expect(customerResponse.body.customers.length).toBe(2);

		expect(customerResponse.body.customers[0].name).toBe('John Doe');
		expect(customerResponse.body.customers[0].address.street).toBe('Main Street');
		expect(customerResponse.body.customers[0].address.number).toBe(123);
		expect(customerResponse.body.customers[0].address.city).toBe('New York');
		expect(customerResponse.body.customers[0].address.zip).toBe('12345-678');

		expect(customerResponse.body.customers[1].name).toBe('Sarah Green');
		expect(customerResponse.body.customers[1].address.street).toBe('St Paul Street');
		expect(customerResponse.body.customers[1].address.number).toBe(546);
		expect(customerResponse.body.customers[1].address.city).toBe('New York');
		expect(customerResponse.body.customers[1].address.zip).toBe('54321-952');
	});

	it('should get a customer by id', async () => {
		const response = await request(app.server).post('/customer').send(mockCustomer);
		expect(response.status).toBe(201);
		expect(response.body.id).toBeDefined();

		const responseCustomer = await request(app.server)
			.get(`/customer/${response.body.id}`);

		expect(responseCustomer.status).toBe(200);
		expect(responseCustomer.body.name).toBe('John Doe');
		expect(responseCustomer.body.address.street).toBe('Main Street');
		expect(responseCustomer.body.address.number).toBe(123);
		expect(responseCustomer.body.address.city).toBe('New York');
		expect(responseCustomer.body.address.zip).toBe('12345-678');
	});

	it('should update a customer', async () => {
		const response = await request(app.server).post('/customer').send(mockCustomer);
		expect(response.status).toBe(201);
		expect(response.body.id).toBeDefined();

		const responseCustomer = await request(app.server)
			.put(`/customer/${response.body.id}`)
			.send(mockCustomer2);

		expect(responseCustomer.status).toBe(200);
		expect(responseCustomer.body.name).toBe('Sarah Green');
		expect(responseCustomer.body.address.street).toBe('St Paul Street');
		expect(responseCustomer.body.address.number).toBe(546);
		expect(responseCustomer.body.address.city).toBe('New York');
		expect(responseCustomer.body.address.zip).toBe('54321-952');
	});
});