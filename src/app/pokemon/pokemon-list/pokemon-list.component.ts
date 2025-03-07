import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {DatePipe, NgClass, UpperCasePipe} from '@angular/common';
import {PokemonService} from '../../service/pokemon.service';
import {Pokemon, PokemonList} from '../../models/pokemon.model';
import {ReversePipe} from '../../pipe/reverse.pipe';
import {PokemonBorderDirective} from '../../directive/pokemon-border.directive';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    NgClass,
    UpperCasePipe,
    PokemonBorderDirective,
    DatePipe,
    ReversePipe,
    RouterLink
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  private readonly _pokemonService: PokemonService = inject(PokemonService);
  public readonly pokemonList: WritableSignal<PokemonList> = signal(this._pokemonService.getPokemons());
  public readonly searchTerm: WritableSignal<string> = signal('');
  public readonly pokemonListFiltered: Signal<Pokemon[]> = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();

    return pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  });

  public increaseLife(pokemon: Pokemon ): void {
    pokemon.life = pokemon.life + 1;
  }

  public decreaseLife(pokemon: Pokemon): void {
    pokemon.life = pokemon.life - 1;
  }

  public updateSize(pokemon: Pokemon): string {
    if (pokemon.life <= 15) {
      return 'small';
    } else if (pokemon.life >= 25) {
      return 'big';
    } else {
      return 'average';
    }
  }

  pokemonProfile(id: number) {
  }
}
