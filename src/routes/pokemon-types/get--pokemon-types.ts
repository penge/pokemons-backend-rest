import type { FastifyInstance, FastifyRequest } from "fastify";
import { uniq } from "lodash";
import { Pokemon } from "@/modules";
import cache from "@/cache";

const schema = {
  response: {
    200: {
      type: "array",
      items: { type: "string" }
    }
  }
} as const;

export const getPokemonTypes = async (request: FastifyRequest): Promise<string[]> => {
  if (!cache.has("pokemon-types")) {
    const res = await request.em.createQueryBuilder(Pokemon).select(["type1", "type2"]).execute();
    const types = uniq([
      res.map((t) => t.type1),
      res.map((t) => t.type2),
    ].flat().filter(Boolean)).sort();

    cache.set("pokemon-types", types);
  }

  return cache.get<string[]>("pokemon-types") as string[];
}

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/pokemon-types",
    schema,
    async handler(request, reply) {
      return getPokemonTypes(request);
    },
  });
}
