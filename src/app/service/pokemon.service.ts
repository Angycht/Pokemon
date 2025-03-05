import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getAllPokemons(limit: number = 20, offset: number = 0): Observable<{results: Pokemon[], count: number}> {
    return this.http.get<{results: any[], count: number}>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      mergeMap(response => {
        const detailRequests = response.results.map((pokemon: any) =>
          this.getPokemonDetails(pokemon.name)
        );
        return forkJoin(detailRequests).pipe(
          map(pokemons => ({results: pokemons, count: response.count}))
        );
      })
    );
  }

  getPokemonDetails(idOrName: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${idOrName}`).pipe(
      mergeMap(pokemon => {
        return this.getPokemonSpecies(pokemon.species.url).pipe(
          map(species => this.mapPokemonData(pokemon, species))
        );
      })
    );
  }

  private getPokemonSpecies(url: string): Observable<any> {
    return this.http.get(url);
  }

  private mapPokemonData(pokemonData: any, speciesData: any): Pokemon {
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      url: `${this.baseUrl}/pokemon/${pokemonData.id}`,
      types: pokemonData.types,
      sprites: pokemonData.sprites,
      weight: pokemonData.weight,
      height: pokemonData.height,
      abilities: pokemonData.abilities,
      stats: pokemonData.stats,
      species: {
        name: speciesData.name,
        url: speciesData.url
      }
    };
  }
}

