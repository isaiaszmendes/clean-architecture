// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListProductDTO {
}

type Product = {
  id:   string;
  name: string;
  price: number;
}

export interface OutputListProductDTO {
  products: Product[];
}