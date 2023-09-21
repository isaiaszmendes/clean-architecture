import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository-interface';
import { InputCreateProductDTO, OutputCreateProductDTO } from './create.product.dto';

export class CreateProductUseCase {
	private productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
		const product = ProductFactory.create(input);
		await this.productRepository.create(product);

		return {
			id: product.id,
			name: product.name,
			price: product.price,
		};
	}
}