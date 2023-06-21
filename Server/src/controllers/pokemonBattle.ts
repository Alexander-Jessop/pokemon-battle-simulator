import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

interface Pokemon {
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
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
  const { playerPokemonId, computerPokemonId } = req.params;

  try {
    const playerPokemon = await fetchPokemon(playerPokemonId);
    const computerPokemon = await fetchPokemon(computerPokemonId);

    const userTypes = playerPokemon.types.map((type) => type.type.name);
    const computerTypes = computerPokemon.types.map((type) => type.type.name);

    const userMoves = playerPokemon.moves.slice(0, 4).map((move) => ({
      name: move.move.name,
      url: move.move.url,
    }));
    const computerMoves = computerPokemon.moves.slice(0, 4).map((move) => ({
      name: move.move.name,
      url: move.move.url,
    }));

    const userHealth = playerPokemon.stats.find(
      (stat) => stat.stat.name === "hp"
    )?.base_stat;
    const computerHealth = computerPokemon.stats.find(
      (stat) => stat.stat.name === "hp"
    )?.base_stat;

    const firstTurn = determineFirstTurn(playerPokemon, computerPokemon);

    const battleData = {
      user: {
        types: userTypes,
        moves: userMoves,
        health: userHealth,
      },
      computer: {
        types: computerTypes,
        moves: computerMoves,
        health: computerHealth,
      },
      firstTurn: firstTurn,
    };

    return res.json(battleData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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

export const computerSelectedPokemon = async (_req: Request, res: Response) => {
  try {
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
        isInBattle: false,
      });
    }

    return res.status(200).json(randomPokemon);
  } catch (error) {
    console.error("Error fetching computer-selected Pokemon:", error);
    throw error;
  }
};

export const calculateDamage = async (req: Request, res: Response) => {
  try {
    const { move, playerPokemon, compPokemon } = req.body;
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const [moveResponse, playerPokemonResponse, compPokemonResponse] =
      await Promise.all([
        axios.get(move),
        axios.get(apiUrl + playerPokemon),
        axios.get(apiUrl + compPokemon),
      ]);

    const moveData = moveResponse.data;
    const movePower = moveData.power;

    const playerPokemonData = playerPokemonResponse.data;
    const playerLevel = playerPokemonData.base_experience;
    const playerAttack = playerPokemonData.stats[1].base_stat;

    const compPokemonData = compPokemonResponse.data;
    const compDefense = compPokemonData.stats[2].base_stat;

    const damage =
      Math.floor(
        (((2 * playerLevel) / 5 + 2) * playerAttack * movePower) /
          compDefense /
          50
      ) + 2;

    res.json({ damage });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the damage." });
  }
};

export const compDmg = async (req: Request, res: Response) => {
  try {
    const { playerPokemon, compPokemon } = req.body;
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

    const [playerPokemonResponse, compPokemonResponse] = await Promise.all([
      axios.get(apiUrl + playerPokemon),
      axios.get(apiUrl + compPokemon),
    ]);

    const playerPokemonData = playerPokemonResponse.data;
    const playerDefense = playerPokemonData.stats[2].base_stat;

    const compPokemonData = compPokemonResponse.data;
    const compLevel = compPokemonData.base_experience;
    const compAttack = compPokemonData.stats[1].base_stat;
    const compMoves = compPokemonData.moves.slice(0, 4);
    const randomMoveIndex = Math.floor(Math.random() * compMoves.length);
    const compMove = compMoves[randomMoveIndex];

    const compMoveResponse = await axios.get(compMove.move.url);
    const compMoveData = compMoveResponse.data;
    const compMovePower = compMoveData.power;

    const damage =
      Math.floor(
        (((2 * compLevel) / 5 + 2) * compAttack * compMovePower) /
          (playerDefense * 2) /
          50
      ) + 2;

    res.json({ damage });
  } catch (error) {
    console.error("Error calculating computer's damage:", error);
    res.status(500).json({
      error: "An error occurred while calculating the computer's damage.",
    });
  }
};
