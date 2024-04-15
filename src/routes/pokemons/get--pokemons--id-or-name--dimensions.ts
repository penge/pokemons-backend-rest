import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import { pick } from "lodash";
import { Dimension } from "@/modules";
import cache from "@/cache";
import { paramsSchema } from "./get--pokemons--id-or-name";
import getPokemonId from "./helpers/get-pokemon-id";

const responseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        weight: { $ref: "dimension" },
        height: { $ref: "dimension" }
      }
    }
  }
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.addSchema({
    $id: "dimension",
    type: "object",
    properties: {
      minimum: { type: "number" },
      maximum: { type: "number" },
      units: { type: "string" }
    }
  });

  fastify.route<{ Params: FromSchema<typeof paramsSchema.params> }>({
    method: "GET",
    url: "/pokemons/:idOrName/dimensions",
    schema: { ...paramsSchema, ...responseSchema },
    async handler(request, reply) {
      const pokemonId = await getPokemonId(request, request.params.idOrName);
      if (!pokemonId) {
        reply.code(404);
        return;
      }

      const cacheKey = `pokemon-${pokemonId}-dimensions`;
      if (!cache.has(cacheKey)) {
        const dimensions = await request.em.findAll(Dimension, {
          where: { pokemon: { $eq: pokemonId } },
          exclude: ["id", "pokemon"]
        });

        const dimensionsByType = [...dimensions].reduce((prev, curr) => {
          prev[curr.type] = pick(curr, ["minimum", "maximum", "units"]);
          return prev;
        }, {} as Record<string, Pick<Dimension, "minimum" | "maximum" | "units">>);

        cache.set(cacheKey, dimensionsByType);
      }

      return cache.get(cacheKey);
    },
  });
}
