import { FastifyRequest as Request, FastifyReply as Response } from "fastify";
import { z } from "zod";

import { CreateCustomerService } from "services/create-customer-service";

export class CustomerController {
  async createCustomer(request: Request, response: Response) {
    const validationSchema = z.object({
      cpf: z.string(),
      firstname: z.string(),
      lastname: z.string(),
    });

    const { cpf, firstname, lastname } = validationSchema.parse(request.body);

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.run({
      cpf,
      firstname,
      lastname,
    });

    return response.send(customer);
  }
}
