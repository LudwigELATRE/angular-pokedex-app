import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon.service';
import {DatePipe} from '@angular/common';
import {getPokemonColor} from '../../models/pokemon.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './pokemon-profile.component.html',
  styleUrl: './pokemon-profile.component.css'
})
export class PokemonProfileComponent {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  private readonly pokemonResponse = toSignal(this.pokemonService.getPokemonById(this.pokemonId).pipe(
    map(pokemon => ({ value: pokemon, error: undefined })),
    catchError(error => of({ value: undefined, error: error }))
  ));

  readonly loading = computed(() => this.pokemonResponse() === undefined);
  readonly error = computed(() => this.pokemonResponse()?.error);
  readonly pokemon = computed(() => this.pokemonResponse()?.value);

  getPokemonColor(type: string ): string {
    return getPokemonColor(type);
  }

  deletePokemon(id: number) {
    this.pokemonService.deletePokemon(id).subscribe(() => {
      this.router.navigate(['/pokemons']);
    });
  }
}
