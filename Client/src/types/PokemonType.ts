import { IPaginationInfo } from "./ApiType";

export interface PokemonType {
  id: number;
  name: string;
  sprite: string;
}
export interface ISelPokeType {
  id: number;
  name: string;
  sprite: string;
}

export interface IApiPokeGen {
  data: ISelPokeType[];
  pagination: IPaginationInfo;
}
