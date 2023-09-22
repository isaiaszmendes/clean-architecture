import fastify, { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/repository/sequelize/customer.model';
import { customerRouter } from './routes/customer.route';

export const app: FastifyInstance = fastify({
	logger: process.env.NODE_ENV === 'test' ? false : true
});

app.register(customerRouter, { prefix: '/customer' });

export let sequelize: Sequelize;

async function setupDb() {
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: ':memory:',
		logging: false,
	});
	await sequelize.addModels([ CustomerModel ]);
	await sequelize.sync();
}

setupDb();