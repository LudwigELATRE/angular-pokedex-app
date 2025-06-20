import {Pokemon, PokemonList} from '../models/pokemon.model';
import {Observable} from 'rxjs';

export abstract class PokemonService {
  abstract getPokemonsList(): Observable<PokemonList>;
  abstract getPokemonById(id: number): Observable<Pokemon>;
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;
  abstract deletePokemon(pokemonId: number): Observable<void>;
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;
  abstract getPokemonTypesList(): string[];
}
