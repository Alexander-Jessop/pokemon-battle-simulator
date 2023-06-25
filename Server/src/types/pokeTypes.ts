export interface IPokeSpec {
  name: string;
  url: string;
}

export interface ISelectPoke {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

export interface IPokemonInfo {
  id: number;
  name: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: {
    name: string;
    type: string;
    power: number;
    accuracy: number;
  }[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}
