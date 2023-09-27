import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { CreateCustomerUseCase } from '../../../useCase/customer/create/create.customer.usecase';
import { CustomerRepository } from '../../customer/repository/sequelize/customer.repository';
import { ListCustomerUseCase } from '../../../useCase/customer/list/list.customer.usecase';
import { FindCustomerUseCase } from '../../../useCase/customer/find/find.customer.usecase';
import { UpdateCustomerUseCase } from '../../../useCase/customer/update/update.customer.usecase';
import { CustomerPresenter } from '../presenters/customer.presenter';

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

	fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
		const useCase = new ListCustomerUseCase(new CustomerRepository());

		try {
			const output = await useCase.execute({});
			const accept = request.headers.accept;
			if (accept && accept.includes('xml')) {
				const xmlOutput = CustomerPresenter.toXML(output);
				reply.code(200).header('Content-Type', 'application/xml').send(xmlOutput);

			} else {
				reply.code(200).header('Content-Type', 'application/json').send(output);
				// ser eu quiser forçar a passagem do accept no header
				// e não tiver mapeado, eu posso mandar esse erro
				// reply.code(406).send('Not Acceptable');
			}
		} catch (err) {
			reply.code(500).send(err);
		}
	});

	fastify.get('/:id', async (request: FastifyRequest<{
		Params: { id: string }
	}>, reply: FastifyReply) => {
		const useCase = new FindCustomerUseCase(new CustomerRepository());

		try {
			const output = await useCase.execute({ id: request.params.id });
			reply.code(200).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});

	fastify.put('/:id', async (request: FastifyRequest<{
		Params: { id: string },
		Body: {
			name: string,
			address: {
				street: string;
				number: number;
				city: string;
				zip: string;
			}
		}
	}>, reply: FastifyReply) => {
		const useCase = new UpdateCustomerUseCase(new CustomerRepository());

		try {
			const requestDTO = {
				id: request.params.id,
				name: request.body.name,
				address: {
					street: request.body.address.street,
					number: request.body.address.number,
					city: request.body.address.city,
					zip: request.body.address.zip,
				}
			};
			const output = await useCase.execute(requestDTO);
			reply.code(200).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});
};