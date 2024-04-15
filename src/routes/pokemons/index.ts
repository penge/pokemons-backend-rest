import type { FastifyInstance } from "fastify";

import getPokemons from "./get--pokemons";
import getPokemonsIdOrName from "./get--pokemons--id-or-name";
import getPokemonsIdOrNameEvolutions from "./get--pokemons--id-or-name--evolutions";
import getPokemonsIdOrNameDimensions from "./get--pokemons--id-or-name--dimensions";
import getPokemonsIdOrNameAttacks from "./get--pokemons--id-or-name--attacks";

import getPokemonsIdOrNameFavorite from "./post--pokemons--id-or-name--favorite";

export default async (fastify: FastifyInstance) => {
  getPokemons(fastify);
  getPokemonsIdOrName(fastify);
  getPokemonsIdOrNameEvolutions(fastify);
  getPokemonsIdOrNameDimensions(fastify);
  getPokemonsIdOrNameAttacks(fastify);

  getPokemonsIdOrNameFavorite(fastify);
}
