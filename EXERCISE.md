# 📖 About

The challenge is designed to provide a simple but interesting and playful challenge to solve. The goal is to validate that your skills meet the project requirements.

Be aware that even though it's a simple challenge, it still takes some time to solve.

## What we are looking for in a candidate

- 🧠 Analytical mind
- 📐 Data modeling and API design skills
- 👨‍💻 Software engineering excellence
- 🔌 Basic DevOps skills
- 🔍 Attention to detail

## ⌨️ The Code challenge

### 1. Business requirements

You are provided with a catalog of Pokemons (check out [pokemons.json](./pokemons.json)). The catalog includes basic information about Pokemons, their statistics, and relationships. Your task is to implement an API that would serve data needed by a website where users can browse the catalog and save their favorite Pokemon.

> 💡 **_Hint:_**  We're testing your **`🧠 Analytical mind`** skills. You have a data file, but you don't have a proper specification.

### 2. Functional requirements

The RESTful API should implement methods to:
- get a list of Pokemons, including:
  - pagination
  - search by name
  - filter by Pokemon type
  - filter by favorite
- get a Pokemon by id
- get a Pokemon by name
- get a list of Pokemon types
- set/unset Pokemon as favorite

> 💡 **_Hint:_**  We're testing your **`📐 Data modeling and API design skills`**. Databases and interfaces have some design techniques (and best practices).

### 3. Non-functional requirements

We want you to implement a pseudo-Bearer authentication. Just showcase the bare minimum building blocks. No need for CRUD operations or a full-fledged solution. The goal is to identify and link a user to his favorite items.

> 💡 **_Hint:_**  We're testing your **`👨‍💻 Software engineering excellence`** skills. The task could sound complicated, but the trick is not to over-engineer it.

### 4. Tech stack

We have pretty simple tech stack requirements that you should try to meet:

- `git`
  - Please commit your code every day or whenever you finish more extensive functionality. We want to see your progress.
- `Node.js`
  - The version is up to you. But specify it in the code through [nvm](https://github.com/nvm-sh/nvm).
- `yarn`
  - We prefer it over `npm`.
- `TypeScript`
  - A typing system is essential in our projects. Avoid using `any`. Follow best practices.
- `Docker`
  - Every backend developer should know about DevOps. Therefore, your solution should include a [Compose file](https://docs.docker.com/compose/compose-file/03-compose-file/).  
  > 💡 **_Hint:_**  We're testing your **`🔌 Basic DevOps skills`**. For instance, we care about multi-stage builds, leveraging build cache, or non-root privileges.
- `Jest`
  - Jest is how we test.
- `Swagger/OpenAPI`
  - We use OpenAPI specs for data validations and contractual agreements between systems/tools.

For the **Brainio project**:
- `MongoDB`
- `Mongoose`
  - You should utilize `seeding`.
- `NestJS`
  
For the **Big AI Models** project:
- `PostgreSQL`
- `MikroORM`
  - You should utilize `migrations` and `seeding`.
- `Fastify`

## How should it work

We expect that we just run `docker compose up` and everything "automagically" sets up and runs. The application should console out the URL of the API endpoint and the swagger/OpenAPI specification.