import { IPokeDetails } from "./PokemonType";

export interface IPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IBattleData {
  id: string;
  playerPokemon: IPokeDetails[];
  computerPokemon: IPokeDetails[];
  currentPlayer: number;
  turn: number;
  status: string;
  winner?: number;
  log?: any[];
}
