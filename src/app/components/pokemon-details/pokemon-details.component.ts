import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import { Habilidades, PokemonDetails } from '../../model/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  id: number = 0;
  nombrePokemon: string = '';
  imgPokemon: string = '';
  descripcion: string = '';
  imgAnimated: string = '';
  especie: string = '';
  peso: number = 0;
  altura: number = 0;
  tipos: string[] = [];
  habilidades: string[] = [];

  constructor(
    private pokemonSvc: PokemonService, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('Nombre del Pokémon:', id);
    this.cargarDetallesPokemon(id);
  }

  cargarDetallesPokemon(nombre: string): void {
    this.pokemonSvc.getPokemonDetail(nombre).subscribe({
      next: (pokemon: PokemonDetails) => {
        this.nombrePokemon = pokemon.name;
        this.imgAnimated = pokemon.sprites.front_default;
        this.imgPokemon = pokemon.sprites.front_default;
        this.peso = pokemon.weight;
        this.altura = pokemon.height;
        this.tipos = pokemon.types.map(t => t.type.name);
        this.habilidades = pokemon.abilities.map(a => a.ability.name);

        this.cargarEspecieInfo(pokemon.species.url);
      },
      error: (err) => console.error('Error al cargar detalles del Pokémon', err)
    });
  }

  cargarEspecieInfo(url: string): void {
    this.pokemonSvc.getHabildades(url).subscribe({
      next: (res: Habilidades) => {
        this.especie = res.genera.find(g => g.language.name === 'en')?.genus || '';
        
      },
      error: (err) => console.error('Error al cargar información de la especie', err)
    });
  }
}
