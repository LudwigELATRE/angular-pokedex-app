import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../service/pokemon.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {getPokemonColor, POKEMON_RULES} from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``
})
export class PokemonEditComponent {
  protected readonly POKEMON_RULES = POKEMON_RULES;

  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id'))).asReadonly();
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId())).asReadonly();
  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name,[
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(this.pokemon().types.map(type => new FormControl(type)), [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_TYPES),
      Validators.maxLength(POKEMON_RULES.MAX_TYPES),
    ]),
  });

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
    console.log(this.form.value);
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
