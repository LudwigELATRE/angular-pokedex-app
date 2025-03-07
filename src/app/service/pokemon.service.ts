import {inject, Injectable} from '@angular/core';
import {Pokemon, PokemonList} from '../models/pokemon.model';
import {POKEMON_LIST} from '../models/pokemon-list.fake';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';
  private readonly http = inject(HttpClient);

  public getPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  public getPokemonById(id: number): Pokemon {
    const pokemon =  POKEMON_LIST.find(pokemon => pokemon.id === id);

    if (pokemon === undefined) {
      throw new Error('Pokemon not found');
    }

    return pokemon;
  }

  getPokemonTypesList(): string[] {
    return ['Plante', ' Poison', 'Feu', 'Eau', 'Insecte', ' Normal', ' Vol', 'Spectre', 'Fée', 'Combat', 'Sol', 'Electrik', 'Acier', 'Psychique', 'Glace', 'Dragon', 'Ténèbres'];
  }
}
