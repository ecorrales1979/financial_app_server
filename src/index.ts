import fastify from "fastify";
import cors from "@fastify/cors";

const port = 3334;

async function bootastrap() {
  const app = fastify({ logger: true });

  app.register(cors, { origin: true });

  app.get("/", (request, response) => {
    return response.send("Tudo OK");
  });

  app.listen({ port }, () => {
    console.log(`Server running at port ${port}`);
  });
}

bootastrap();
