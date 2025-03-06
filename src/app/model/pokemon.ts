export interface PokemonDetails {
  GenerationV: any;
  abilities:                Ability[];
  base_experience:          number;
  forms:                    Species[];
  height:                   number;
  id:                       number;
  is_default:               boolean;
  location_area_encounters: string;
  name:                     string;
  url:                      string;
  order:                    number;
  past_types:               any[];
  species:                  Species;
  sprites:                  Sprites;
  stats:                    Stat[];
  types:                    Type[];
  weight:                   number;
  
}

export interface Habilidades {
  flavor_text_entries: any;
  effect_changes:      any[];
  id:                  number;
  is_main_series:      boolean;
  name:                string;
  pokemon:             PokemonDetails[];
  genera:              any[];
}

export interface PokemonesResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  PokemonDetails[];
}

export interface Stat {
  base_stat: number;
  effort:    number;
  stat:      Species;
}
export interface Ability {
  ability:   Species;
  is_hidden: boolean;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
}


export interface Sprites {
  back_default:       string;
  back_female:        string;
  back_shiny:         string;
  back_shiny_female:  string;
  front_default:      string;
  front_female:       string;
  front_shiny:        string;
  front_shiny_female: string;
}
export interface Type {
  slot: number;
  type: Species;
}
