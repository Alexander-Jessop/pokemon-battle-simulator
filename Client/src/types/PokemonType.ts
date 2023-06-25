import { IPaginationInfo } from "./ApiType";

export interface ISelPokeType {
  id: number;
  name: string;
  sprite: string;
}

export interface IApiPokeGen {
  data: ISelPokeType[];
  pagination: IPaginationInfo;
}

export interface IPokeDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    other: { dream_world: { front_default: string } };
    front_default: string;
    back_default: string;
  };
  isInBattle: boolean;
  isFainted: boolean;
  damage: number;
}
