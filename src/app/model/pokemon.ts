export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: PokemonSpecies;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonSpecies {
  name: string;
  url: string;
}