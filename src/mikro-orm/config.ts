import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";
import { Pokemon, Dimension, Attack, Favorite } from "../modules";

export default defineConfig({
  dbName: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,

  entities: [Pokemon, Dimension, Attack, Favorite],
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
  debug: process.env.NODE_ENV === "development",

  migrations: {
    path: `./${process.env.NODE_ENV === "production" ? "out" : "src"}/migrations`,
  },

  seeder: {
    path: `./${process.env.NODE_ENV === "production" ? "out" : "src"}/seeders`,
  }
});
