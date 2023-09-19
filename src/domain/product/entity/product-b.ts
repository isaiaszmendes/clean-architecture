import { ProductInterface } from './product.interface';

type ProductProps = {
  id: string;
  name: string;
  price: number;
}

export class ProductB implements ProductInterface {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor({ id, name, price }: ProductProps) {
		this._id = id;
		this._name = name;
		this._price = price;
		this.validate();
	}

	validate(): boolean {
		// validate should receive params to validate
		if (this._id.length === 0) throw new Error('id is required');
		if (this._name.length === 0) throw new Error('name is required');
		if (this._price < 0) throw new Error('price must be be greater than zero');
		return true;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	changeName(name: string): void {
		this._name = name;
		this.validate();
	}

	get price(): number {
		return this._price * 2;
	}

	changePrice(price: number): void {
		this._price = price;
		this.validate();
	}
}
