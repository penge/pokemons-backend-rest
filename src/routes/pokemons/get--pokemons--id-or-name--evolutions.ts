import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import cache from "@/cache";
import { paramsSchema } from "./get--pokemons--id-or-name";
import findOnePokemonByIdOrName from "./helpers/find-one-pokemon-by-id-or-name";

const responseSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" }
        }
      }
    }
  }
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.route<{ Params: FromSchema<typeof paramsSchema.params> }>({
    method: "GET",
    url: "/pokemons/:idOrName/evolutions",
    schema: { ...paramsSchema, ...responseSchema },
    async handler(request, reply) {
      let pokemon = await findOnePokemonByIdOrName(request, request.params.idOrName);
      if (!pokemon) {
        reply.code(404);
        return;
      }

      const cacheKey = `pokemon-${pokemon.id}-evolutions`;
      if (!cache.has(cacheKey)) {
        const evolutions: { id: string, name: string }[] = [];
        for (const _ of [1, 2]) { // Pokemon can evolve at most 2-times
          if (pokemon?.evolvesTo) {
            pokemon = await findOnePokemonByIdOrName(request, pokemon.evolvesTo.id);
            if (pokemon) {
              const { id, name } = pokemon;
              evolutions.push({ id, name });
            }
          }
        }

        cache.set(cacheKey, evolutions);
      }

      return cache.get(cacheKey);
    },
  });
}
