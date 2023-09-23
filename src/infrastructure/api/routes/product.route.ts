import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { CreateProductUseCase } from '../../../useCase/product/create/create.product.usecase';
import { ProductRepository } from '../../product/repository/sequelize/product.repository';
import { ListProductUseCase } from '../../../useCase/product/list/list.product.usecase';

export const productRouter = async (fastify: FastifyInstance) => {
	fastify.post('/', async (request: FastifyRequest<{
		Body: {
			name: string;
			price: number;
		}
	}>, reply: FastifyReply) => {
		const useCase = new CreateProductUseCase(new ProductRepository());

		try {
			const productDTO = {
				name: request.body.name,
				price: request.body.price,
			};

			const output = await useCase.execute(productDTO);
			reply.code(201).send(output);
		} catch (err) {
			reply.code(500).send(err);
		}
	});

	fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
		const useCase = new ListProductUseCase(new ProductRepository());

		try {
			const output = await useCase.execute({});
			reply.code(200).send(output);
		} catch (err) {
			reply.code(500).send();
		}
	});
};