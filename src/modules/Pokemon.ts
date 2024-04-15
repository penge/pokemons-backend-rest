import { Entity, Check, OneToMany, OneToOne, Index, PrimaryKey, Property, Enum, TextType, IntegerType, FloatType, Collection, Filter } from "@mikro-orm/core";
import * as generated from "../generated";
import { Dimension } from "./Dimension";
import { Favorite } from "./Favorite";

type BasicPokemon = Pick<Pokemon, "id" | "name" | "classification" | "types">;

type Evolution = { to: string, requiredAmount: number, requiredName: string };
type ExtendedPokemon = BasicPokemon & Pick<Pokemon, "fleeRate" | "maxCP" | "maxHP"> & { evolution: Evolution | null };

@Entity({ tableName: "pokemons" })
@Check<Pokemon>({ name: "pokemons_type_check", expression: (columns) => `${columns.type1} != ${columns.type2}` })
@Check<Pokemon>({ name: "pokemons_evolution_check", expression: (columns) => [
  `(${columns.evolvesTo} is null AND ${columns.evolutionRequiredAmount} is null AND ${columns.evolutionRequiredName} is null)`,
  `(${columns.evolvesTo} is not null AND ${columns.evolutionRequiredAmount} is not null AND ${columns.evolutionRequiredName} is not null)`
].join(" OR ")})
@Filter({ name: "favoritedBy", cond: (args) => ({ favorites: { user: args.user } }) })
export class Pokemon {
  @PrimaryKey({ columnType: "varchar(4)" })
  id!: string;

  @Index({ type: "GIN", expression: 'create index "pokemons_name_index" on "pokemons" using GIN (name gin_trgm_ops)' })
  @Property({ type: TextType })
  name!: string;

  @Enum({ items: () => generated.Classification, nativeEnumName: "classification" })
  classification!: generated.Classification;

  @Index()
  @Enum({ items: () => generated.Type, nativeEnumName: "type" })
  type1!: generated.Type

  @Index()
  @Enum<Pokemon>({ items: () => generated.Type, nativeEnumName: "type" })
  type2!: generated.Type | null

  @Property<Pokemon>({
    type: FloatType,
    check: (columns) => `${columns.fleeRate} >= 0 AND ${columns.fleeRate} <= 1`
  })
  fleeRate!: number;

  @Property<Pokemon>({
    type: IntegerType,
    check: (columns) => `${columns.maxCP} > 0`
  })
  maxCP!: number;

  @Property<Pokemon>({
    type: IntegerType,
    check: (columns) => `${columns.maxHP} > 0`
  })
  maxHP!: number;

  @OneToMany(() => Dimension, (dimension) => dimension.pokemon)
  dimensions = new Collection<Dimension>(this);

  @OneToOne()
  evolvesTo!: Pokemon | null;

  @Property({ type: IntegerType })
  evolutionRequiredAmount!: number | null;

  @Property({ type: TextType })
  evolutionRequiredName!: string | null;

  @OneToMany(() => Favorite, (favorite) => favorite.pokemon)
  favorites = new Collection<Favorite>(this);

  get types() {
    return [this.type1, this.type2].filter(Boolean) as generated.Type[];
  }

  asBasicPokemon(): BasicPokemon {
    return {
      id: this.id,
      name: this.name,
      classification: this.classification,
      types: this.types,
    }
  }

  asExtendedPokemon(): ExtendedPokemon {
    return {
      ...this.asBasicPokemon(),
      fleeRate: this.fleeRate,
      maxCP: this.maxCP,
      maxHP: this.maxHP,
      evolution: (this.evolvesTo !== null && this.evolutionRequiredAmount !== null && this.evolutionRequiredName !== null) ? {
        to: this.evolvesTo.id,
        requiredAmount: this.evolutionRequiredAmount,
        requiredName: this.evolutionRequiredName,
      } : null,
    }
  }
}
