# Pokémon RESTful API

Implements [_EXERCISE_](./EXERCISE.md) using:

- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [MikroORM](https://mikro-orm.io/)
- [Postgres](https://www.postgresql.org/)
- [Biome](https://biomejs.dev/)
- [Hurl](https://hurl.dev/)
- [Hygen](https://www.hygen.io/)

<br>

Docker:

```sh
$ DB_PASSWORD=hello docker compose up
```

<br>

## Notes

### 1. Analyzing the data

By analyzing [`pokemons.json`](./pokemons.json), I found out:

- Pokémon "types" are common within:
  - _"types"_
  - _"resistant"_
  - _"weaknesses"_
  - and even attacks' _"type"_ (as attack against specific Pokémon type)

- Other keywords describing similar data:
  - _"weight"_  / _"height"_
  - _"fast"_ / _"special"_ (move)
  - and finally, _"classification"_

I have used **Hygen** to generate code for these _enums_. In the case of _"classification"_, I have **removed** the "Pokémon" word from every classification as it seems redundant and can be harder to type into database because of the "é".

### 2. Database

Assuming Pokémon data remains static, the database should be optimized for fast reads, minimizing unnecessary joins and implementing other performance enhancements.

As a way to achieve this, I have stored Pokémon types as **_"type1"_** and **_"type2"_**, since Pokémon can be of at most two types.
Both types are _enums_, with _type1_ required and _type2_ optional. They cannot be the same type.

I have enabled _Index_-es on both columns **_"type1"_** and **_"type2"_** for faster search.

Speaking of _Index_-es, I have enabled **GIN** on column **_"name"_** (requires `pg_trgm`).

Along the way I defined various _constraints_ for integrity checks, which proved helpful when I got to Migrations.

#### Entities, Migrations and Seeding

In all three cases, I used **MikroORM**. I first defined Entities (or Modules), then used them to create the initial migration, and finally seeded the database.

#### Relationships

The most interesting relationship to me was the Pokémon evolutions, which I modeled using a _one-to-one_, or _self-referencing_, relationship.

### 3. API

I used **Fastify** to develop the API. To document the endpoints and define constraints, I leveraged _JSON Schema_. Fastify _plugins_ were then used to generate **Swagger** documentation from this information.

All endpoints are publicly accessible. However, getting a list of favorite Pokémon requires authentication, as does adding or removing Pokémon from favorites.

I assume the API is running behind a _reverse proxy_ which does the authentication, and sets **"x-webauth-user"** header if user is authenticated.

### 4. Linting

To assure code quality, I used **Biome**.

### 5. Tests

For Unit tests I used **Tap**. There are plenty of API tests done in **Hurl**.

<br><br>

I hope you like the solution. Let me know! 👋
