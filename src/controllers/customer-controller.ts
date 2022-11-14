import { FastifyRequest as Request, FastifyReply as Response } from "fastify";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { customerRepository } from "repositories/CustomerRepository";

export class CustomerController {
  async createCustomer(request: Request, response: Response) {
    const validationSchema = z.object({
      cpf: z.string(),
      name: z.string(),
    });

    const { cpf, name } = validationSchema.parse(request.body);

    const customerAlreadyExists = await customerRepository.findCustomerByCpf(
      cpf
    );

    if (customerAlreadyExists) {
      return response.status(422).send({ message: "Customer already exists" });
    }

    const customer = await customerRepository.createCustomer({
      id: uuidv4(),
      cpf,
      name,
    });

    return response.send(customer);
  }
}
