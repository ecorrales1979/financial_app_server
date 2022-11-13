import { CustomerModel } from "models/customer";

interface AddCustomer {
  id: string;
  cpf: string;
  name: string;
}

export class CustomerRepository {
  customers: CustomerModel[] = [];

  createCustomer({ id, cpf, name }: AddCustomer) {
    const customer: CustomerModel = {
      id,
      cpf,
      name,
      statements: [],
    };

    this.customers.push(customer);

    return customer;
  }
}
