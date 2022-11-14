import { FastifyInstance } from "fastify";
import { CustomerController } from "controllers/customer-controller";

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.post("/account", new CustomerController().createCustomer);
}
