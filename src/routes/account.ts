import { FastifyInstance } from "fastify";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { CustomerRepository } from "repositories/CustomerRepository";

export async function accountRoutes(fastify: FastifyInstance) {
  const customerRepository = new CustomerRepository();

  fastify.post("/account", async (request, response) => {
    const validationSchema = z.object({
      cpf: z.string(),
      name: z.string(),
    });

    const { cpf, name } = validationSchema.parse(request.body);

    const customerAlreadyExists = customerRepository.findCustomerByCpf(cpf);

    if (customerAlreadyExists) {
      return response.status(422).send({ message: "Customer already exists" });
    }

    const id = uuidv4();

    const customer = customerRepository.createCustomer({ id, cpf, name });

    return response.send(customer);
  });
}
