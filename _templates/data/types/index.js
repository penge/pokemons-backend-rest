const uniq = require("lodash/uniq");
const pokemons = require("../../../pokemons.json");

const types = uniq([
  ...pokemons.map((p) => p.types).flat(),
  ...pokemons.map((p) => p.resistant).flat(),
  ...pokemons.map((p) => p.weaknesses).flat(),
].flat()).sort();

const classifications = uniq(pokemons.map((p) => p.classification.replace(" Pokémon", ""))).sort();

const dimensions = ["Weight", "Height"];

const moves = ["Fast", "Special"];

module.exports = {
  params: () => {
    return {
      types,
      classifications,
      dimensions,
      moves
    };
  }
};
