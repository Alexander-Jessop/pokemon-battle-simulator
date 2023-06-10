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
    let offset = 0;
    let limit = 10;

    if (req.query.offset) {
      offset = parseInt(req.query.offset as string, 10);
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string, 10);
    }

    const response = await axios.get<PokemonListResponse>(
      process.env.POKEMON_API as string,
      {
        params: {
          offset,
          limit,
        },
      }
    );

    const pokemonData = await Promise.all(
      response.data.results.map(async (pokemon) => {
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
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
