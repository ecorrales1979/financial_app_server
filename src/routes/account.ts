import { FastifyInstance } from "fastify";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { CustomerRepository } from "repositories/CustomerRepository";
import { CustomerController } from "controllers/customer-controller";

export async function accountRoutes(fastify: FastifyInstance) {
  const customerRepository = new CustomerRepository();

  fastify.post("/account", new CustomerController().createCustomer);
}
