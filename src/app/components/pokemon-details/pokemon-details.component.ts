import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import { Router } from 'express';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonDetails(id!).subscribe(data => {
      this.pokemon = data;
    });
  }

}
