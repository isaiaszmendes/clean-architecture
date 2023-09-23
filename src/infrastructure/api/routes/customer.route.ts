import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { CreateCustomerUseCase } from '../../../useCase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repository/sequelize/customer.repository';
import { ListCustomerUseCase } from '../../../useCase/customer/list/list.customer.usecase';
import { FindCustomerUseCase } from '../../../useCase/customer/find/find.customer.usecase';

export const customerRouter = async (fastify: FastifyInstance) => {
	fastify.post('/', async (request: FastifyRequest<{
		Body: {
			name: string;
			address: {
				street: string;
				number: number;
				city: string;
				zip: string;
			}
		}
	}>, reply: FastifyReply) => {
		const useCase = new CreateCustomerUseCase(new CustomerRepository());

		try {
			const customerDTO = {
				name: request.body.name,
				address: {
					street: request.body.address.street,
					number: request.body.address.number,
					city: request.body.address.city,
					zip: request.body.address.zip,
				}
			};
			const output = await useCase.execute(customerDTO);

			reply.code(201).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});

	fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
		const useCase = new ListCustomerUseCase(new CustomerRepository());

		try {
			const output = await useCase.execute({});
			reply.code(200).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});

	fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
		const useCase = new FindCustomerUseCase(new CustomerRepository());

		try {
			const output = await useCase.execute({ id: request.params.id });
			reply.code(200).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});
};