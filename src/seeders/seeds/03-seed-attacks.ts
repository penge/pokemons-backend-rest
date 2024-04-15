import type { Em } from "../DatabaseSeeder";
import * as generated from "../../generated";
import pokemons from "../../../pokemons.json";
import { Attack } from "../../modules/Attack";

export default (em: Em) => {
  let id = 0;

  for (const pokemon of pokemons) {
    const { fast, special } = pokemon.attacks;

    const attackGroups: Array<[{ name: string; type: string; damage: number; }[], generated.Move]> = [
      [fast, generated.Move.Fast],
      [special, generated.Move.Special],
    ];

    for (const [attacks, move] of attackGroups) {
      for (const attack of attacks) {
        em.create(Attack, {
          id: ++id,
          pokemon: pokemon.id,
          move,
          name: attack.name,
          type: attack.type as generated.Type,
          damage: attack.damage,
        });
      }
    }
  }
}
