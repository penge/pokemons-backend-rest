import Fastify from "fastify";
import fastifyCaching from "@fastify/caching";

import { RequestContext } from "@mikro-orm/core";
import initMikroOrm from "./mikro-orm/init";
import type { Em } from "./seeders/DatabaseSeeder";
import { DatabaseSeeder } from "./seeders/DatabaseSeeder";

import swagger from "./swagger";
import pokemonTypes from "./routes/pokemon-types";
import pokemons from "./routes/pokemons";
import { Pokemon } from "./modules";

declare module "fastify" {
  export interface FastifyRequest {
    user?: string
    em: Em
  }
}

(async () => {
  const orm = await initMikroOrm();

  const migrator = orm.getMigrator();
  await migrator.up();

  const pokemonCount = await orm.em.count(Pokemon);
  if (!pokemonCount) {
    const seeder = orm.getSeeder();
    await seeder.seed(DatabaseSeeder);
  }

  const fastify = Fastify({ logger: true });

  fastify.get("/ping", () => "pong");

  fastify.addHook("onRequest", (request, reply, done) => {
    request.user = request.headers["x-webauth-user"] as string | undefined;
    done();
  });

  fastify.addHook("onRequest", (request, reply, done) => {
    RequestContext.create(orm.em, done);
  });

  fastify.addHook("preHandler", (request, reply, done) => {
    request.em = orm.em;
    done();
  });

  fastify.addHook("onClose", async () => {
    await orm.close();
  });

  swagger(fastify);

  fastify.register(fastifyCaching, { privacy: fastifyCaching.privacy.PUBLIC, expiresIn: 604800 }); // expires in 1 week
  fastify.register(pokemonTypes, { prefix: "/api" });
  fastify.register(pokemons, { prefix: "/api" });

  try {
    await fastify.listen({
      host: process.env.NODE_ENV === "production" ? "0.0.0.0" : undefined,
      port: 8080
    });

    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
