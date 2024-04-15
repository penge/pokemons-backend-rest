import type { Em } from "../DatabaseSeeder";
import * as generated from "../../generated";
import { Dimension } from "../../modules";
import pokemons from "../../../pokemons.json";

const parseDimension = (dimension: { minimum: string, maximum: string }): { minimum: number, maximum: number, units: string } => {
  const { minimum, maximum } = dimension;
  return {
    minimum: Number.parseFloat(minimum),
    maximum: Number.parseFloat(maximum),
    units: minimum.replace(String(Number.parseFloat(minimum)), ""),
  };
}

export default (em: Em) => {
  let id = 0;

  for (const pokemon of pokemons) {
    em.create(Dimension, {
      id: ++id,
      pokemon: pokemon.id,
      type: generated.Dimension.Weight,
      ...parseDimension(pokemon.weight),
    });

    em.create(Dimension, {
      id: ++id,
      pokemon: pokemon.id,
      type: generated.Dimension.Height,
      ...parseDimension(pokemon.height),
    });
  }
}
