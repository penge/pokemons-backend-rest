import type { FastifyInstance } from "fastify";

import getPokemonTypes from "./get--pokemon-types";

export default async (fastify: FastifyInstance) => {
  getPokemonTypes(fastify);
}
