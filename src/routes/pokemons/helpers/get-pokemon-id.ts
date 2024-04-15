import type { FastifyRequest } from "fastify";
import getColumnName from "./get-column-name";
import findOnePokemonByIdOrName from "./find-one-pokemon-by-id-or-name";

/**
 * Returns pokemon "id".
 *
 * A) Checks if "idOrName" is "id". If yes, "id" is returned.
 * B) Otherwise its "name", finds pokemon by "name", and then returns its "id".
 */
export default async (request: FastifyRequest, idOrName: string): Promise<string | undefined> => {
  const columnName = getColumnName(idOrName);
  if (columnName === "id") {
    return idOrName;
  }

  const pokemon = await findOnePokemonByIdOrName(request, idOrName);
  return pokemon?.id;
}
