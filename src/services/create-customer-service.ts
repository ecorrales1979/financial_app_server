import { v4 as uuidv4 } from "uuid";

import { customerRepository } from "repositories/customer-repository";

interface NewCustomerData {
  cpf: string;
  firstname: string;
  lastname: string;
}

export class CreateCustomerService {
  async run(customerData: NewCustomerData) {
    const { cpf, firstname, lastname } = customerData;

    const customerAlreadyExists = await customerRepository.findCustomerByCpf(
      cpf
    );

    if (customerAlreadyExists) {
      throw new Error("Customer already exists");
    }

    const customer = await customerRepository.createCustomer({
      id: uuidv4(),
      cpf,
      firstname,
      lastname,
    });

    return customer;
  }
}
