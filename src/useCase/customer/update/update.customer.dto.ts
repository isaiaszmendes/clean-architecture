export interface InputUpdateCustomerDTO {
  id:      string;
  name:    string;
  address: {
    street: string;
    city:   string;
    number: number;
    zip:    string;
  }
}

// Não podemos utilizar o mesmo DTO para entrada e saída,
// pois eventualmente podemos ter campos diferentes no futuro
export interface OutputUpdateCustomerDTO {
  id:      string;
  name:    string;
  address: {
    street: string;
    city:   string;
    number: number;
    zip:    string;
  }
}