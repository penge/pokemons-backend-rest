import type { SqlEntityManager, AbstractSqlDriver, AbstractSqlConnection, AbstractSqlPlatform } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";

import seedPokemons from "./seeds/01-seed-pokemons";
import seedDimensions from "./seeds/02-seed-dimensions";
import seedAttacks from "./seeds/03-seed-attacks";

export type Em = SqlEntityManager<AbstractSqlDriver<AbstractSqlConnection, AbstractSqlPlatform>>;

export class DatabaseSeeder extends Seeder {
  async run(em: Em): Promise<void> {
    seedPokemons(em);
    seedDimensions(em);
    seedAttacks(em);
  }
}
