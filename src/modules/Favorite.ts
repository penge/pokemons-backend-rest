import { Entity, ManyToOne, PrimaryKeyProp, Property, TextType } from "@mikro-orm/core";
import type { Pokemon } from "./Pokemon";

@Entity({ tableName: "favorites" })
export class Favorite {
  @ManyToOne({ primary: true })
  pokemon!: Pokemon;

  @Property({ type: TextType, primary: true })
  user!: string;

  [PrimaryKeyProp]?: ["pokemon", "user"];
}
