import { CustomerModel } from "models/customer";

interface AddCustomer {
  id: string;
  cpf: string;
  firstname: string;
  lastname: string;
}

export class CustomerRepository {
  customers: CustomerModel[] = [];

  async createCustomer({ id, cpf, firstname, lastname }: AddCustomer) {
    const customer: CustomerModel = {
      id,
      cpf,
      firstname,
      lastname,
      statements: [],
    };

    this.customers.push(customer);

    return customer;
  }

  async findCustomerByCpf(cpf: string) {
    const customer = this.customers.find((item) => item.cpf === cpf);

    return customer ?? null;
  }
}

export const customerRepository = new CustomerRepository();
