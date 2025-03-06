import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import {  PokemonDetails, PokemonesResponse } from '../../model/pokemon';
import { forkJoin, map, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemons:PokemonDetails[]=[];
  adelante=0;
  atras=0;
  btnActive=true;
  imgAnimated:any;

  constructor(private pokemonSvc:PokemonService, private router:Router) { }

  ngOnInit(): void {

    localStorage.removeItem('Valor');
  
    console.log(this.imgAnimated)
    this.pokemonSvc.getPokemons().subscribe(res=>{
      this.pokemons=res;
      
    })   

  }
  
  onclickPokemon(nombre:string){
   this.pokemonSvc.getPokemonDetail(nombre).subscribe(pokemon=>{
    
    this.router.navigate(['/pokemon', pokemon.name])

   })
  }

  paginarNext(){

    this.adelante=20

    
    this.pokemonSvc.getPaginacionNext(this.adelante).subscribe(res=>{
      this.pokemons=res;
     
      
    })   

    localStorage.removeItem('Valor');   
    this.btnActive=false;

   

  }

  paginarPreviuos(){  

    this.atras= 20;

   
    this.pokemonSvc.getPaginacionPrevious(this.atras).subscribe(res=>{
      this.pokemons=res;
      console.log(res)     
      if (localStorage.getItem('Valor')==='detener') {
        this.btnActive=true;
      }
      
    })
 
    
  }


}


