import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const pokemonBattle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const url = (process.env.BATTLE_POKEMON_API + id) as string;
    const response = await axios.get(url);
    const pokemonData = response.data;

    const sprites = pokemonData.sprites.other.dream_world.front_default;
    const types = pokemonData.types;
    const moves = pokemonData.moves
      .map((move: { move: { name: string; url: string } }) => move.move)
      .slice(0, 4);

    res.json({ sprites, types, moves });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
