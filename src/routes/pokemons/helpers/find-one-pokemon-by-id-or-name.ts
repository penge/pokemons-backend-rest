import type { FastifyRequest } from "fastify";
import type { Loaded } from "@mikro-orm/core";
import { sql } from "@mikro-orm/core";
import { Pokemon } from "@/modules";
import cache from "@/cache";
import getColumnName from "./get-column-name";

/**
 * Finds one Pokemon by "id" or "name" (case insensitive)
 *
 * Stores Pokemon to cache for faster retrieval.
 * <Key>               | <Value>
 * "pokemon-001"       | Pokemon
 * "pokemon-bulbasaur" | "pokemon-001"
 */
export default async (request: FastifyRequest, idOrName: string): Promise<Loaded<Pokemon, never, "*", never> | null | undefined> => {
  const idOrNameLowerCased = idOrName.toLowerCase();
  const columnName = getColumnName(idOrNameLowerCased);

  if (!cache.has(`pokemon-${idOrNameLowerCased}`)) {
    const pokemon = await request.em.findOne(Pokemon, {
      [columnName === "id" ? columnName : sql.lower(columnName)]: idOrNameLowerCased
    });

    if (pokemon) {
      cache.set(`pokemon-${pokemon.id}`, pokemon);
      cache.set(`pokemon-${pokemon.name.toLowerCase()}`, `pokemon-${pokemon.id}`);
    }
  }

  const cacheKey = columnName === "id"
    ? `pokemon-${idOrNameLowerCased}`
    : cache.get<string>(`pokemon-${idOrNameLowerCased}`);

  if (!cacheKey) {
    return undefined;
  }

  return cache.get<Loaded<Pokemon, never, "*", never> | null>(cacheKey);
}
