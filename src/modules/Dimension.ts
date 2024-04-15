import { Entity, ManyToOne, PrimaryKey, Property, Enum, FloatType } from "@mikro-orm/core";
import type { Pokemon } from "./Pokemon";
import * as generated from "../generated";

@Entity({ tableName: "dimensions" })
export class Dimension {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  pokemon!: Pokemon;

  @Enum({ items: () => generated.Dimension, nativeEnumName: "dimension" })
  type!: generated.Dimension;

  @Property({ type: FloatType })
  minimum!: number;

  @Property({ type: FloatType })
  maximum!: number;

  @Property({ columnType: "varchar(2)" })
  units!: string;
}
