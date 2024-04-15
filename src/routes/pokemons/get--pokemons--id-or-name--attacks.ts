import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import { pick } from "lodash";
import { Attack } from "@/modules";
import cache from "@/cache";
import { paramsSchema } from "./get--pokemons--id-or-name";
import getPokemonId from "./helpers/get-pokemon-id";

const responseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        fast: { type: "array", items: { $ref: "attack" } },
        special: { type: "array", items: { $ref: "attack" } }
      }
    }
  }
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.addSchema({
    $id: "attack",
    type: "object",
    properties: {
      name: { type: "string" },
      type: { type: "string" },
      damage: { type: "integer" }
    }
  });

  fastify.route<{ Params: FromSchema<typeof paramsSchema.params> }>({
    method: "GET",
    url: "/pokemons/:idOrName/attacks",
    schema: { ...paramsSchema, ...responseSchema },
    async handler(request, reply) {
      const pokemonId = await getPokemonId(request, request.params.idOrName);
      if (!pokemonId) {
        reply.code(404);
        return;
      }

      const cacheKey = `pokemon-${pokemonId}-attacks`;
      if (!cache.has(cacheKey)) {
        const attacks = await request.em.findAll(Attack, {
          where: { pokemon: { $eq: pokemonId } },
          exclude: ["id", "pokemon"]
        });

        const attacksByMove = [...attacks].reduce((prev, curr) => {
          if (!(curr.move in prev)) {
            prev[curr.move] = [];
          }

          prev[curr.move].push(pick(curr, ["name", "type", "damage"]));
          return prev;
        }, {} as Record<string, Pick<Attack, "name" | "type" | "damage">[]>);

        cache.set(cacheKey, attacksByMove);
      }

      return cache.get(cacheKey);
    },
  });
}
