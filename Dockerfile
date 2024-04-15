FROM node:slim as deps
WORKDIR /app
COPY package*.json /app/
RUN npm ci


FROM node:slim as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json tsconfig.json pokemons.json ./
RUN npm run build


FROM node:slim
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/out ./out
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/pokemons.json ./
EXPOSE 8080
CMD ["npm", "run", "start"]
