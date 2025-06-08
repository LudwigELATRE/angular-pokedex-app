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

  public getPokemonById(id: number): Observable<Pokemon> {
    const url = this.POKEMON_API_URL + '/' + id;
    return this.http.get<Pokemon>(url);
  }

  public addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.POKEMON_API_URL, pokemon);
  }

  public updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = this.POKEMON_API_URL + '/' + pokemon.id;
    return this.http.put<Pokemon>(url, pokemon);
  }

  public deletePokemon(id: number): Observable<void> {
    const url = this.POKEMON_API_URL + '/' + id;
    return this.http.delete<void>(url);
  }

  getPokemonTypesList(): string[] {
    return ['Plante', ' Poison', 'Feu', 'Eau', 'Insecte', ' Normal', ' Vol', 'Spectre', 'Fée', 'Combat', 'Sol', 'Electrik', 'Acier', 'Psychique', 'Glace', 'Dragon', 'Ténèbres'];
  }
}
