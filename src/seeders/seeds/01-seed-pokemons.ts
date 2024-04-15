import type { Em } from "../DatabaseSeeder";
import type * as generated from "../../generated";
import { Pokemon } from "../../modules";
import pokemons from "../../../pokemons.json";

type Evolutions = Record<string, {
  evolvesTo: string,
  evolutionRequiredAmount: number,
  evolutionRequiredName: string
}>;

export default async (em: Em) => {
  for (const pokemon of pokemons) {
    em.create(Pokemon, {
      id: pokemon.id,
      name: pokemon.name,
      classification: pokemon.classification.replace(" Pokémon", "") as generated.Classification,
      type1: pokemon.types[0] as generated.Type,
      type2: pokemon.types[1] as generated.Type | undefined,
      fleeRate: pokemon.fleeRate,
      maxCP: pokemon.maxCP,
      maxHP: pokemon.maxHP,
      types: [],
    });
  }

  await em.flush();

  const evolutions: Evolutions = pokemons.filter((p) => p.evolutions).reduce((ev, pokemon) => {
    if (pokemon.id in ev || !pokemon.evolutions || !pokemon.evolutionRequirements) {
      return ev;
    }

    ev[pokemon.id] = {
      evolvesTo: (`000${pokemon.evolutions[0].id}`).slice(-3), // 1 => "001", 52 => "052", 151 => "151"
      evolutionRequiredAmount: pokemon.evolutionRequirements.amount,
      evolutionRequiredName: pokemon.evolutionRequirements.name,
    };

    return ev;
  }, {} as Evolutions);

  for (const [id, evolution] of Object.entries(evolutions)) {
    const qb = em.createQueryBuilder(Pokemon);
    qb.update(evolution).where({ id });
    qb.execute();
  }
}
