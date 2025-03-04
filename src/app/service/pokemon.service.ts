import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  //Obtener todos los Pokémon de la API
  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon`);
  }

  //Obtener detalles de un Pokémon (por nombre o ID)
  getPokemonDetails(idOrName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${idOrName}`);
  }

  //Obtener información de la especie del Pokémon
  getPokemonSpecies(idOrName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${idOrName}`);
  }
}
