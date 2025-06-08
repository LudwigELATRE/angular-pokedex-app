import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {getPokemonColor, POKEMON_RULES} from '../../models/pokemon.model';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pokemon-edit.component.html',
  styles: ``
})
export class PokemonEditComponent {
  protected readonly POKEMON_RULES = POKEMON_RULES;

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id'))).asReadonly();
  readonly pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId()));
  readonly form = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(),
    damage: new FormControl(),
    types: new FormArray([], [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_TYPES),
      Validators.maxLength(POKEMON_RULES.MAX_TYPES),
    ]),
  });

constructor() {
  effect(() => {
    const pokemon = this.pokemon();

    if (pokemon) {
      this.form.patchValue({
        name: pokemon.name,
        life: pokemon.life,
        damage: pokemon.damage,
      });

      pokemon.types.forEach(type => {
        this.PokemonTypesList.push(new FormControl(type));
      });
    }
  });
  }

  get PokemonTypesList(): FormArray {
  return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string): boolean {
    return !!this.PokemonTypesList.controls.find(control => control.value === type);
  }

  onPokmemonTypeChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      this.PokemonTypesList.push(new FormControl(type));
    } else {
      const index = this.PokemonTypesList.controls.findIndex(control => control.value === type);
      this.PokemonTypesList.removeAt(index);
    }
  }

  onSubmit() {
    const isFormValid = this.form.valid;
    const pokemon = this.pokemon();
    if (isFormValid && pokemon) {
      const updatedPokemon = {
        ...pokemon,
        name: this.pokemonName.value,
        life: this.pokemonLife.value,
        damage: this.pokemonDamage.value,
        types: this.PokemonTypesList.value,

      };
      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        this.router.navigate(['/pokemons', updatedPokemon.id]);
      });
    }
  }

  getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type === 'Electrik' ? 'black' : 'white';
  }

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  increase(selecteur: string): void {
    if (selecteur === 'life') {
      this.pokemonLife.setValue(this.pokemonLife.value + 1);
    } else if (selecteur === 'damage') {
      this.pokemonDamage.setValue(this.pokemonDamage.value + 1);
    }
  }

  decrease(selecteur: string): void {
    if (selecteur === 'life') {
      this.pokemonLife.setValue(this.pokemonLife.value - 1);
    } else if (selecteur === 'damage') {
      this.pokemonDamage.setValue(this.pokemonDamage.value - 1);
    }
  }
}
