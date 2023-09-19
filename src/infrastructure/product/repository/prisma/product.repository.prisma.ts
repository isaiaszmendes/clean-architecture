import { Product } from '../../../../domain/product/entity/product';
import { ProductRepositoryInterface } from '../../../../domain/product/repository/product-repository-interface';

export class ProductRepositoryPrisma implements ProductRepositoryInterface {
	async create(entity: Product): Promise<void> {
		throw new Error('Method not implemented.');
	}
	update(entity: Product): Promise<void> {
		throw new Error('Method not implemented.');
	}
	find(id: string): Promise<Product> {
		throw new Error('Method not implemented.');
	}
	findAll(): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}
}
