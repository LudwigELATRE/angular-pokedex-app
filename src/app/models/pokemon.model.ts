export interface Pokemon {
  id: number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types: [string, string?, string?];
  created: Date;
}

export type PokemonList = Pokemon[];

export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè]+$/,
  MAX_NAME: 20,
  MIN_NAME: 3,
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
  MIN_TYPES: 1,
  MAX_TYPES: 3,
};

export function getPokemonColor(type: string): string
{
  switch (type) {
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
