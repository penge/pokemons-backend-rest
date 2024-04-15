import { Entity, ManyToOne, PrimaryKey, Property, Enum, TextType, IntegerType } from "@mikro-orm/core";
import type { Pokemon } from "./Pokemon";
import * as generated from "../generated";

@Entity({ tableName: "attacks" })
export class Attack {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  pokemon!: Pokemon;

  @Enum({ items: () => generated.Move, nativeEnumName: "move" })
  move!: generated.Move;

  @Property({ type: TextType })
  name!: string;

  @Enum({ items: () => generated.Type, nativeEnumName: "type" })
  type!: generated.Type

  @Property<Pokemon>({ type: IntegerType })
  damage!: number;
}
