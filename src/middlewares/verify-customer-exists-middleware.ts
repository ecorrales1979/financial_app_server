import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { z } from "zod";

import { customerRepository } from "repositories/customer-repository";
import { AppError } from "utils/app-error";

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
    throw new AppError("Customer not found", 404);
  }

  next();
}
