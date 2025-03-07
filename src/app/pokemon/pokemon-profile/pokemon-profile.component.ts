import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon.service';
import {DatePipe} from '@angular/common';
import {getPokemonColor} from '../../models/pokemon.model';

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
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId));

  getPokemonColor(type: string ): string {
    return getPokemonColor(type);
  }
}
