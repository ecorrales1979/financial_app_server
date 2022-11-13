import { FastifyInstance } from "fastify";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { CustomerModel } from "models/customer";

const customers: CustomerModel[] = [];

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.post("/account", async (request, response) => {
    const validationSchema = z.object({
      cpf: z.string(),
      name: z.string(),
    });

    const { cpf, name } = validationSchema.parse(request.body);

    const id = uuidv4();

    const customer = {
      id,
      cpf,
      name,
      statements: [],
    };

    customers.push(customer);

    return response.send(customer);
  });
}
