import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import { QueryOrder } from "@mikro-orm/core";
import { Pokemon } from "@/modules";
import type * as generated from "@/generated";
import { getPokemonTypes } from "../pokemon-types/get--pokemon-types";

const queryStringSchema = {
  querystring: {
    type: "object",
    properties: {
      search: { type: "string" },
      type: { type: "string" },
      favorite: { type: "boolean" },
      limit: { type: "integer", default: 20, minimum: 1 },
      offset: { type: "integer", default: 0, minimum: 0 },
    }
  }
} as const;

const responseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              classification: { type: "string" },
              types: {
                type: "array",
                items: { type: "string" }
              }
            }
          }
        },
        meta: {
          allOf: [queryStringSchema.querystring],
          properties: {
            count: { type: "integer" }
          }
        }
      }
    }
  }
} as const;

export default async (fastify: FastifyInstance) => {
  fastify.route<{ Querystring: FromSchema<typeof queryStringSchema.querystring> }>({
    method: "GET",
    url: "/pokemons",
    schema: { ...queryStringSchema, ...responseSchema },
    preHandler(request, reply, done) {
      if (request.query.favorite && !request.user) {
        reply.status(401).send();
      }

      done();
    },
    async handler(request, reply) {
      const { search, type, favorite, limit, offset } = request.query;

      let actualType: generated.Type | undefined;
      if (type) {
        const pokemonTypes = await getPokemonTypes(request);
        actualType = pokemonTypes.find((t) => t.toLowerCase() === type.toLowerCase()) as generated.Type | undefined;
      }

      const [pokemons, count] = await request.em.findAndCount(Pokemon, {
        ...(search ? { name: { $ilike: `%${search}%` } } : {}),
        $or: [
          ...[actualType ? { type1: { $eq: actualType } } : {}],
          ...[actualType ? { type2: { $eq: actualType } } : {}],
        ],
      }, {
        filters: favorite ? { favoritedBy: { user: request.user } } : undefined,
        exclude: ["fleeRate", "maxCP", "maxHP", "evolvesTo", "evolutionRequiredAmount", "evolutionRequiredName"],
        orderBy: { id: QueryOrder.ASC },
        limit,
        offset,
      });

      const basicPokemons = pokemons.map((pokemon) => pokemon.asBasicPokemon());

      return {
        data: basicPokemons,
        meta: {
          search,
          type: actualType,
          favorite,
          limit,
          offset,
          count
        },
      };
    },
  });
}
