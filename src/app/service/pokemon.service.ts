import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import {  Habilidades, PokemonDetails, PokemonesResponse } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseURL: string = 'https://pokeapi.co/api/v2';
  private limitPage = 20;
  public offsetPage = 0;


  constructor(private http:HttpClient) { }

  get params() {
    return {
      limit:this.limitPage,
      offset:this.offsetPage
    }
  }
 
  getHabildades(url: string):Observable<Habilidades>{

    return this.http.get<Habilidades>(`${url}`);

  }
  getPokemons(): Observable<PokemonDetails[]> {
    return this.http.get<PokemonesResponse>(`${this.baseURL}/pokemon`, { params: this.params }).pipe(
      map(res => res.results),
      mergeMap(pokemons => 
        forkJoin(pokemons.map(pokemon => this.http.get<PokemonDetails>(pokemon.url)))
      )
    );
  }

  getPokemonDetail(nombre:string):Observable<PokemonDetails>{

    return this.http.get<PokemonDetails>(`${this.baseURL}/pokemon/${nombre}`);

  }

 

  getPaginacionNext(adelante: number): Observable<PokemonDetails[]> {
    this.offsetPage += adelante;
  
    return this.http.get<PokemonesResponse>(`${this.baseURL}/pokemon`, { params: this.params }).pipe(
      map(res => res.results),
      mergeMap(pokemons => 
        forkJoin(pokemons.map(pokemon => this.http.get<PokemonDetails>(pokemon.url)))
      )
    );
  }
  getPaginacionPrevious(atras: number): Observable<PokemonDetails[]> {
    this.offsetPage = Math.max(0, this.offsetPage - atras); // Evitar valores negativos
  
    if (this.offsetPage === 0) {
      localStorage.setItem('Valor', 'detener');
    }
  
    return this.http.get<PokemonesResponse>(`${this.baseURL}/pokemon`, { params: this.params }).pipe(
      map(res => res.results),
      mergeMap(pokemons => 
        forkJoin(pokemons.map(pokemon => this.http.get<PokemonDetails>(pokemon.url)))
      )
    );
  }

}