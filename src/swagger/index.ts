import type { FastifyInstance } from "fastify";

import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export default async (fastify: FastifyInstance) => {
  fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      servers: [
        {
          url: "http://[::1]:8080",
          description: "Development server"
        }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "x-webauth-user",
            in: "header"
          }
        }
      },
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: "/documentation",
  });
}
