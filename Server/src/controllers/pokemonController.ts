import axios from "axios";
import { Request, Response } from "express";
import {
  fetchPokemonByGeneration,
  fetchPokemonByNameOrId,
} from "../api/pokeApi.js";
import { ISelectPoke, IPokemonInfo } from "../types/pokeTypes.js";

export const getPokemon = async (req: Request, res: Response) => {
  const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";

  console.log("req.body", req.body);

  try {
    const identifiers: string[] | number[] = req.body.identifiers;

    const pokemonData = await Promise.all(
      identifiers.map(async (identifier) => {
        const response = await axios.get<IPokemonInfo>(
          `${POKEMON_API}${identifier}`
        );

        return {
          id: response.data.id,
          name: response.data.name,
          types: response.data.types,
          stats: response.data.stats,
          moves: response.data.moves,
          sprites: response.data.sprites,
        };
      })
    );

    res.status(200).json(pokemonData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

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
        return await fetchPokemonByNameOrId(pokemon.name);
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
