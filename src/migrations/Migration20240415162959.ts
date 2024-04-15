import { Migration } from '@mikro-orm/migrations';

export class Migration20240415162959 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists pg_trgm;');
    this.addSql('create type "classification" as enum (\'Atrocious\', \'Ball\', \'Balloon\', \'Barrier\', \'Bat\', \'Beak\', \'Bird\', \'Bivalve\', \'Bone Keeper\', \'Bubble Jet\', \'Butterfly\', \'Classy Cat\', \'Cobra\', \'Coconut\', \'Cocoon\', \'Dopey\', \'Dragon\', \'Drill\', \'Duck\', \'Egg\', \'Electric\', \'Evolution\', \'Fairy\', \'Fire Horse\', \'Fish\', \'Flame\', \'Flower\', \'Flycatcher\', \'Fossil\', \'Fox\', \'Freeze\', \'Gas\', \'Genetic\', \'Goldfish\', \'Hairy\', \'Hermit Crab\', \'Humanshape\', \'Hypnosis\', \'Insect\', \'Jellyfish\', \'Kicking\', \'Legendary\', \'Licking\', \'Lightning\', \'Lizard\', \'Lonely\', \'Magnet\', \'Mantis\', \'Megaton\', \'Mole\', \'Mouse\', \'Mushroom\', \'Mysterious\', \'New Species\', \'Parent\', \'Pig Monkey\', \'Pincer\', \'Poison Bee\', \'Poison Gas\', \'Poison Moth\', \'Poison Pin\', \'Psi\', \'Punching\', \'Puppy\', \'River Crab\', \'Rock\', \'Rock Snake\', \'Scratch Cat\', \'Sea Lion\', \'Seed\', \'Shadow\', \'Shellfish\', \'Sleeping\', \'Sludge\', \'Snake\', \'Spikes\', \'Spiral\', \'Spitfire\', \'Stagbeetle\', \'Starshape\', \'Superpower\', \'Tadpole\', \'Tiny Bird\', \'Tiny Turtle\', \'Transform\', \'Transport\', \'Triple Bird\', \'Turtle\', \'Twin Bird\', \'Vine\', \'Virtual\', \'Weed\', \'Wild Bull\', \'Wild Duck\', \'Worm\');');
    this.addSql('create type "type" as enum (\'Bug\', \'Dark\', \'Dragon\', \'Electric\', \'Fairy\', \'Fighting\', \'Fire\', \'Flying\', \'Ghost\', \'Grass\', \'Ground\', \'Ice\', \'Normal\', \'Poison\', \'Psychic\', \'Rock\', \'Steel\', \'Water\');');
    this.addSql('create type "dimension" as enum (\'weight\', \'height\');');
    this.addSql('create type "move" as enum (\'fast\', \'special\');');
    this.addSql('create table "pokemons" ("id" varchar(4) not null, "name" text not null, "classification" "classification" not null, "type1" "type" not null, "type2" "type" null, "flee_rate" real not null, "max_cp" int not null, "max_hp" int not null, "evolves_to_id" varchar(4) null, "evolution_required_amount" int null, "evolution_required_name" text null, constraint "pokemons_pkey" primary key ("id"), constraint pokemons_flee_rate_check check (flee_rate >= 0 AND flee_rate <= 1), constraint pokemons_max_cp_check check (max_cp > 0), constraint pokemons_max_hp_check check (max_hp > 0), constraint pokemons_evolution_check check ((evolves_to_id is null AND evolution_required_amount is null AND evolution_required_name is null) OR (evolves_to_id is not null AND evolution_required_amount is not null AND evolution_required_name is not null)), constraint pokemons_type_check check (type1 != type2));');
    this.addSql('create index "pokemons_type1_index" on "pokemons" ("type1");');
    this.addSql('create index "pokemons_type2_index" on "pokemons" ("type2");');
    this.addSql('alter table "pokemons" add constraint "pokemons_evolves_to_id_unique" unique ("evolves_to_id");');
    this.addSql('create index "pokemons_name_index" on "pokemons" using GIN (name gin_trgm_ops);');
    this.addSql('create table "favorites" ("pokemon_id" varchar(4) not null, "user" text not null, constraint "favorites_pkey" primary key ("pokemon_id", "user"));');
    this.addSql('create table "dimensions" ("id" serial primary key, "pokemon_id" varchar(4) not null, "type" "dimension" not null, "minimum" real not null, "maximum" real not null, "units" varchar(2) not null);');
    this.addSql('create table "attacks" ("id" serial primary key, "pokemon_id" varchar(4) not null, "move" "move" not null, "name" text not null, "type" "type" not null, "damage" int not null);');
    this.addSql('alter table "pokemons" add constraint "pokemons_evolves_to_id_foreign" foreign key ("evolves_to_id") references "pokemons" ("id") on update cascade on delete set null;');
    this.addSql('alter table "favorites" add constraint "favorites_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "dimensions" add constraint "dimensions_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "attacks" add constraint "attacks_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
  }
}
