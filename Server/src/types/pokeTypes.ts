export interface IPokeSpec {
  name: string;
  url: string;
}

export interface IPokePlayer {
  id: number;
  name: string;
  sprite: string;
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

export interface IStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonInfo {
  id: number;
  name: string;
  types: IType[];
  stats: IStat[];
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

export interface IMoveData {
  name: string;
  type: {
    name: string;
    url: string;
  };
  power: number | null;
  accuracy: number | null;
}
