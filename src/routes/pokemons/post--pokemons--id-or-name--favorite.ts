import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import getPokemonId from "./helpers/get-pokemon-id";
import { paramsSchema } from "./get--pokemons--id-or-name";
import { Favorite } from "@/modules";

const bodySchema = {
  body: {
    type: "object",
    required: ["favorite"],
    properties: {
      favorite: { type: "boolean" }
    }
  }
} as const;

const responseSchema = {
  response: {
    200: {
      type: "boolean"
    }
  }
} as const;

const schema = {
  ...paramsSchema,
  ...bodySchema,
  ...responseSchema,
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.route<{ Params: FromSchema<typeof schema.params>, Body: FromSchema<typeof schema.body> }>({
    method: "POST",
    url: "/pokemons/:idOrName/favorite",
    schema,
    preHandler(request, reply, done) {
      if (!request.user) {
        reply.status(401).send();
      }

      done();
    },
    async handler(request, reply) {
      const pokemonId = await getPokemonId(request, request.params.idOrName);
      if (!pokemonId) {
        reply.code(404);
        return;
      }

      const favorite = request.em.create(Favorite, {
        pokemon: pokemonId,
        user: request.user,
      });

      try {
        if (request.body.favorite) {
          await request.em.persist(favorite).flush();
        } else {
          await request.em
            .createQueryBuilder(Favorite)
            .delete(Favorite)
            .where(favorite).execute();
        }
      } catch { }

      reply.code(request.body.favorite ? 201 : 200);
      return request.body.favorite;
    },
  });
}
