import { FastifyInstance } from "fastify";

import { CustomerController } from "controllers/customer-controller";
import { StatementController } from "controllers/statement-controller";

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.post("/account", new CustomerController().createCustomer);

  fastify.get("/statements/:cpf", new StatementController().findStatements);
}
