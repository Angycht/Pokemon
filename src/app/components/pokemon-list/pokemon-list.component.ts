import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 20;
  totalPokemons = 0;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getAllPokemons(this.limit, this.offset).subscribe(
      (data: {results: Pokemon[], count: number}) => {
        this.pokemons = [...this.pokemons, ...data.results];
        this.totalPokemons = data.count;
        this.offset += this.limit;
      },
      error => console.error('Error cargando datos de pokemon:', error)
    );
  }


  loadMore() {
    if (this.offset < this.totalPokemons) {
      this.loadPokemons();
    }
  }

  getPokemonTypes(pokemon: Pokemon): string {
    return pokemon.types.map(t => t.type.name).join(', ');
  }
}


