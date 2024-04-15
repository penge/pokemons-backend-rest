import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import findOnePokemonByIdOrName from "./helpers/find-one-pokemon-by-id-or-name";

export const paramsSchema = {
  params: {
    type: "object",
    required: ["idOrName"],
    properties: {
      idOrName: { type: "string" }
    }
  }
} as const;

const responseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        classification: { type: "string" },
        types: {
          type: "array",
          items: { type: "string" }
        },
        fleeRate: { type: "number" },
        maxCP: { type: "integer" },
        maxHP: { type: "integer" },
        evolution: {
          type: ["object", "null"],
          properties: {
            to: { type: "string" },
            requiredAmount: { type: "integer" },
            requiredName: { type: "string" }
          }
        }
      }
    }
  }
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.route<{ Params: FromSchema<typeof paramsSchema.params> }>({
    method: "GET",
    url: "/pokemons/:idOrName",
    schema: { ...paramsSchema, ...responseSchema },
    async handler(request, reply) {
      const pokemon = await findOnePokemonByIdOrName(request, request.params.idOrName);
      if (!pokemon) {
        reply.code(404);
        return;
      }

      return pokemon.asExtendedPokemon();
    },
  });
}
