import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const getPokemon = async (req: Request, res: Response) => {
  const POKEMON_API = "https://pokeapi.co/api/v2/pokemon?";
  try {
    let offset = 0;
    let limit = 10;

    if (req.query.offset) {
      offset = parseInt(req.query.offset as string, 10);
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string, 10);
    }

    const response = await axios.get<PokemonListResponse>(POKEMON_API, {
      params: {
        offset,
        limit,
      },
    });

    const pokemonData = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const { data } = await axios.get<Pokemon>(pokemon.url);

        return {
          id: data.id,
          name: data.name,
          sprite: data.sprites.other.dream_world.front_default,
          battleSprite: data.sprites.back_default,
          isInBattle: false,
          isFainted: false,
        };
      })
    );

    res.status(200).json(pokemonData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

import {
  fetchPokemonByGeneration,
  fetchPokemonByName,
} from "../api/pokeApi.js";
import { ISelectPoke } from "../types/pokeTypes.js";

export const getPokemonByGeneration = async (req: Request, res: Response) => {
  const { generation = "1", page = "1", pageSize = "10" } = req.query;

  try {
    const pokemonNames = await fetchPokemonByGeneration(+generation);

    const pageNumber = +page;
    const itemsPerPage = +pageSize;
    const totalItems = pokemonNames.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedPokemonNames = pokemonNames.slice(startIndex, endIndex);

    const pokemonData = await Promise.all(
      paginatedPokemonNames.map(async (pokemon: { name: string }) => {
        return await fetchPokemonByName(pokemon.name);
      })
    );

    const selctionScreenData = pokemonData.map((pokemon: ISelectPoke) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other.dream_world.front_default,
      };
    });

    const paginationInfo = {
      currentPage: pageNumber,
      totalPages: totalPages,
      totalItems: totalItems,
    };

    res
      .status(200)
      .json({ data: selctionScreenData, pagination: paginationInfo });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;

    res.status(500).json({ error: errorMessage });
  }
};
