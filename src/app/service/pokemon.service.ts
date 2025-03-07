import { Injectable } from '@angular/core';
import {Pokemon, PokemonList} from '../models/pokemon.model';
import {POKEMON_LIST} from '../models/pokemon-list.fake';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public getPokemons(): PokemonList {
    return POKEMON_LIST;
  }

  public getPokemonById(id: number): Pokemon {
    const pokemon =  POKEMON_LIST.find(pokemon => pokemon.id === id);

    if (pokemon === undefined) {
      throw new Error('Pokemon not found');
    }

    return pokemon;
  }

  getPokemonTypesList(): string[] {
    return ['Plante', ' Poison', 'Feu', 'Eau', 'Insecte', ' Normal', ' Vol'];
  }
}
