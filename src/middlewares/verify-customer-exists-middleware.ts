import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { z } from "zod";

import { customerRepository } from "repositories/customer-repository";

export async function VerifyCustomerExistsMiddleware(
  request: FastifyRequest,
  response: FastifyReply,
  next: HookHandlerDoneFunction
) {
  const validationSchema = z.object({
    cpf: z.string().length(11, "Incorrect CPF"),
  });

  const { cpf } = validationSchema.parse(request.params);

  const customer = await customerRepository.findCustomerByCpf(cpf);

  if (!customer) {
    return response.status(404).send({ message: "Customer not found" });
  }

  next();
}
