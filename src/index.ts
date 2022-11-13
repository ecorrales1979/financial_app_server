import fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const port = 3334;

const customers = [];

async function bootastrap() {
  const app = fastify({ logger: true });

  app.register(cors, { origin: true });

  app.get("/", (request, response) => {
    return response.send("Tudo OK");
  });

  app.post("/account", async (request, response) => {
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

  app.listen({ port }, () => {
    console.log(`Server running at port ${port}`);
  });
}

bootastrap();
