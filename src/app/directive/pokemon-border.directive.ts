import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {getPokemonColor} from '../models/pokemon.model';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {

  private initialShadow: string = 'none';

  @Input() pokemonType!: string; // Déclare l'input correctement

  constructor(private el: ElementRef) {
    this.initialShadow = this.el.nativeElement.style.boxShadow || 'none'; // Stocke la valeur initiale
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = getPokemonColor(this.pokemonType);
    this.setBoxShadow(`0 16px 20px ${color}`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBoxShadow(this.initialShadow);
  }

  private setBoxShadow(shadow: string) {
    this.el.nativeElement.style.boxShadow = shadow;
  }
}
