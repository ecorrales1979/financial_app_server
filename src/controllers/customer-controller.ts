import { FastifyRequest as Request, FastifyReply as Response } from "fastify";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { customerRepository } from "repositories/customer-repository";

export class CustomerController {
  async createCustomer(request: Request, response: Response) {
    const validationSchema = z.object({
      cpf: z.string(),
      firstname: z.string(),
      lastname: z.string(),
    });

    const { cpf, firstname, lastname } = validationSchema.parse(request.body);

    const customerAlreadyExists = await customerRepository.findCustomerByCpf(
      cpf
    );

    if (customerAlreadyExists) {
      return response.status(422).send({ message: "Customer already exists" });
    }

    const customer = await customerRepository.createCustomer({
      id: uuidv4(),
      cpf,
      firstname,
      lastname,
    });

    return response.send(customer);
  }
}
