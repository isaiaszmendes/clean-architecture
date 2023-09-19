// Entidade Anêmica -> Pois customer só guarda dados, como se fosse gerado para um ORM

// DTO -> Data Transfer Object
export class CustomerAnemic {
	_id: string;
	_name: string;
	_address: string;

	constructor({ id, name, address }: { id: string, name: string, address:string }) {
		this._id = id;
		this._name = name;
		this._address = address;
	}

	get id(): string {
		return this._id;
	}
	get name(): string {
		return this._name;
	}
	get address(): string {
		return this._address;
	}

	set id(id: string) {
		this._id = id;
	}
	set name(name: string) {
		this._name = name;
	}
	set address(address: string) {
		this._address = address;
	}
}