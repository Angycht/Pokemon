import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  allPokemons: any[] = []; // Aquí almacenamos TODOS los Pokémon
  displayedPokemons: any[] = []; // Solo los Pokémon de la página actual
  pageSize = 50; // Cantidad de Pokémon por página
  currentPage = 0; // Página actual
  Math: any;
  offset: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getAllPokemons().subscribe(data => {
      this.allPokemons = data.results.map((pokemon: any, index: number) => ({
        ...pokemon,
        id: index + 1, // Añadir ID al Pokémon
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      this.updateDisplayedPokemons();// Llamar a esta función después de cargar todos los Pokémon
    });
  }

  // Actualizar Pokémon visibles según la página actual
  updateDisplayedPokemons() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedPokemons = this.allPokemons.slice(start, end);
  }

  nextPage() {
    const totalPages = Math.ceil(this.allPokemons.length / this.pageSize);
    if (this.currentPage < totalPages - 1) {  // Solo incrementa si no estás en la última página
      this.currentPage++;
      this.updateDisplayedPokemons();
    }
  }


  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedPokemons();
    }
  }

}
