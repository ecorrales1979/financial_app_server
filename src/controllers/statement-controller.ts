import { FastifyRequest as Request, FastifyReply as Response } from "fastify";
import { customerRepository } from "repositories/customer-repository";
import { z } from "zod";

export class StatementController {
  async findStatements(request: Request, response: Response) {
    const validationSchema = z.object({
      cpf: z.string(),
    });

    const { cpf } = validationSchema.parse(request.params);

    const customer = await customerRepository.findCustomerByCpf(cpf);

    if (!customer) {
      return response.status(404).send({ message: "Customer already exists" });
    }

    return response.send(customer.statements);
  }
}
