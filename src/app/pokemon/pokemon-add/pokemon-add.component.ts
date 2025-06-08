import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PokemonService} from '../../service/pokemon.service';
import {Router, RouterLink} from '@angular/router';
import {getPokemonColor, Pokemon, POKEMON_RULES} from '../../models/pokemon.model';


@Component({
  selector: 'app-pokemon-add',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './pokemon-add.component.html',
  styles: ``
})
export class PokemonAddComponent {
  protected readonly POKEMON_RULES = POKEMON_RULES;

  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  imagePreview: string | ArrayBuffer | null = null;


  readonly form = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(10),
    damage: new FormControl(1),
    picture: new FormControl(),
    types: new FormArray([], [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_TYPES),
      Validators.maxLength(POKEMON_RULES.MAX_TYPES),
    ]),
  });

  onSubmit(){
    const isFormValid = this.form.valid;
    if (isFormValid) {
      const pokemon: Pokemon = {
        id: 0,
        name: this.form.get('name')!.value!,
        life: this.form.get('life')!.value!,
        damage: this.form.get('damage')!.value!,
        picture: this.form.get('picture')!.value!,
        types: this.PokemonTypesList.value,
        created: new Date(),
      };
      this.pokemonService.addPokemon(pokemon).subscribe((createdPokemon: Pokemon) => {
        this.router.navigate(['/pokemons', createdPokemon.id]);
      });
    }
  }

  get PokemonTypesList(): FormArray {
    return this.form.get('types') as FormArray;
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

  getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type === 'Electrik' ? 'black' : 'white';
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

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.form.patchValue({ picture: file });
    this.form.get('picture')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
