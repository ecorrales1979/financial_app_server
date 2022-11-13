import fastify from "fastify";
import cors from "@fastify/cors";
import { accountRoutes } from "routes/account";

const port = 3334;

async function bootastrap() {
  const app = fastify({ logger: true });

  await app.register(cors, { origin: true });

  app.get("/", (request, response) => {
    return response.send("Tudo OK");
  });

  await app.register(accountRoutes);

  app.listen({ port }, () => {
    console.log(`Server running at port ${port}`);
  });
}

bootastrap();
