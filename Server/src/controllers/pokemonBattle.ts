import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { Session } from "express-session";

dotenv.config();

interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

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
  types: {
    type: {
      name: string;
    };
  }[];
  moves: PokemonMove[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

interface UserSession extends Session {
  user?: any;
  selectedPokemon?: any;
}

const fetchPokemon = async (pokemonId: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await axios.get<Pokemon>(url);
  return response.data;
};

const determineFirstTurn = (userPokemon: Pokemon, computerPokemon: Pokemon) => {
  const userSpeed = userPokemon.stats.find(
    (stat) => stat.stat.name === "speed"
  )?.base_stat;
  const computerSpeed = computerPokemon.stats.find(
    (stat) => stat.stat.name === "speed"
  )?.base_stat;

  if (userSpeed && computerSpeed) {
    if (userSpeed > computerSpeed) {
      return "user";
    } else if (userSpeed < computerSpeed) {
      return "computer";
    }
  }

  return "user";
};

export const pokemonBattle = async (req: Request, res: Response) => {
  const userSelectedPokemon = (req.session as UserSession).selectedPokemon;
  const computerSelectedPokemon = await fetchPokemon("1");

  if (!userSelectedPokemon) {
    return res.status(400).json({ error: "User's Pokemon not found" });
  }

  try {
    const userPokemon = await fetchPokemon(userSelectedPokemon.id.toString());
    const computerPokemon = computerSelectedPokemon;

    const userSprites = userPokemon.sprites.other.dream_world.front_default;
    const computerSprites =
      computerPokemon.sprites.other.dream_world.front_default;

    const userTypes = userPokemon.types.map((type) => type.type.name);
    const computerTypes = computerPokemon.types.map((type) => type.type.name);

    const userMoves = userPokemon.moves
      .slice(0, 4)
      .map((move) => move.move.name);
    const computerMoves = computerPokemon.moves
      .slice(0, 4)
      .map((move) => move.move.name);

    const userHealth = userPokemon.stats.find(
      (stat) => stat.stat.name === "hp"
    )?.base_stat;
    const computerHealth = computerPokemon.stats.find(
      (stat) => stat.stat.name === "hp"
    )?.base_stat;

    const firstTurn = determineFirstTurn(userPokemon, computerPokemon);

    res.json({
      user: {
        sprites: userSprites,
        types: userTypes,
        moves: userMoves,
        health: userHealth,
      },
      computer: {
        sprites: computerSprites,
        types: computerTypes,
        moves: computerMoves,
        health: computerHealth,
      },
      firstTurn: firstTurn,
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  battleSprite: string;
  isInBattle: boolean;
}

interface CustomRequest extends Request {
  body: {
    selectedTeam: Pokemon[];
    index: number;
  };
}

export const userSwitchPokemon = (req: CustomRequest, res: Response) => {
  try {
    const { selectedTeam, index } = req.body;

    if (selectedTeam && selectedTeam.length > 0) {
      const activePokemonIndex = selectedTeam.findIndex(
        (pokemon) => pokemon.isInBattle
      );
      if (activePokemonIndex !== -1) {
        selectedTeam[activePokemonIndex].isInBattle = false;
      }
      selectedTeam[index].isInBattle = true;
    }

    return res
      .status(200)
      .json({ message: "Pokémon switched successfully", selectedTeam });
  } catch (error) {
    console.error("Failed to switch Pokémon:", error);
    return res.status(500).json({ message: "Failed to switch Pokémon" });
  }
};

export const computerSelectedPokemon = async () => {
  const POKEMON_API = "https://pokeapi.co/api/v2/pokemon?";
  const response = await axios.get(POKEMON_API + "limit=151");
  const pokemonList = response.data.results;
  const randomPokemon = [];

  while (randomPokemon.length < 6) {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const { data } = await axios.get(pokemonList[randomIndex].url);
    randomPokemon.push({
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
    });
  }

  return randomPokemon;
};
