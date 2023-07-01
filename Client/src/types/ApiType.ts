import { IPokeDetails } from "./PokemonType";

export interface IPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ILogs {
  message: string;
  turn: number;
  timestamp: string;
}

export interface IBattleData {
  id: string;
  playerPokemon: IPokeDetails[];
  computerPokemon: IPokeDetails[];
  currentPlayer: number;
  turn: number;
  status: string;
  winner?: number;
  log: ILogs[];
}

export interface IUserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  visits: number;
  battlesPlayed: number;
  movesUsed: number;
  gamesWon: number;
  gamesLost: number;
}
