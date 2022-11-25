import { FastifyInstance } from "fastify";

import { CustomerController } from "controllers/customer-controller";
import { StatementController } from "controllers/statement-controller";
import { VerifyCustomerExistsMiddleware } from "middlewares/verify-customer-exists-middleware";

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.post("/account", new CustomerController().createCustomer);

  fastify.route({
    method: "GET",
    url: "/statements/:cpf",
    onRequest: VerifyCustomerExistsMiddleware,
    handler: new StatementController().findStatements,
  });
}
