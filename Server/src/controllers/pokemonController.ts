import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

interface Pokemon {
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

interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const getPokemon = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const { data } = await axios.get<PokemonListResponse>(
      process.env.POKEMON_API!,
      {
        params: {
          offset,
          limit,
        },
      }
    );

    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data } = await axios.get<Pokemon>(pokemon.url);

        return {
          id: data.id,
          name: data.name,
          sprite: data.sprites.other.dream_world.front_default,
        };
      })
    );

    res.status(200).json(pokemonData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
