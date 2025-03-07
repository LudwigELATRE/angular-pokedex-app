import { Directive, ElementRef, HostListener, Input } from '@angular/core';

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
    const color = this.getColor();
    this.setBoxShadow(`0 16px 20px ${color}`);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBoxShadow(this.initialShadow);
  }

  private setBoxShadow(shadow: string) {
    this.el.nativeElement.style.boxShadow = shadow;
  }

  private getColor(): string {
    switch (this.pokemonType) {
      case 'Feu': return '#EF5350'; // Rouge
      case 'Eau': return '#42A5F5'; // Bleu
      case 'Plante': return '#66BB6A'; // Vert
      case 'Insecte': return '#A8B820'; // Vert olive
      case 'Vol': return '#A98FF3'; // Bleu ciel
      case 'Poison': return '#A040A0'; // Violet foncé
      case 'Fée': return '#F8BBD0'; // Rose clair
      case 'Electrik': return '#F4D03F'; // Jaune
      case 'Glace': return '#74C1E2'; // Bleu clair
      case 'Roche': return '#B8A038'; // Brun
      case 'Sol': return '#E0C068'; // Beige
      case 'Acier': return '#B8B8D0'; // Gris métallique
      case 'Dragon': return '#7038F8'; // Violet électrique
      case 'Spectre': return '#705898'; // Violet sombre
      case 'Psy': return '#F85888'; // Rose vif
      case 'Combat': return '#C03028'; // Rouge foncé
      case 'Ténèbres': return '#705848'; // Brun foncé
      case 'Normal': return '#A8A878'; // Gris-beige

      default: return '#303030'; // Noir/gris pour les inconnus
    }
  }

}
