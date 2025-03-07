import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {DatePipe, NgClass, UpperCasePipe} from '@angular/common';
import {Pokemon, PokemonList} from './models/pokemon.model';
import {PokemonBorderDirective} from './directive/pokemon-border.directive';
import {ReversePipe} from './pipe/reverse.pipe';
import {PokemonService} from './service/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    UpperCasePipe,
    PokemonBorderDirective,
    DatePipe,
    ReversePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
}
