import { Request, Response } from "express";
import randNumGen from "../helpers/randNumGen.js";
import generatePokemonData from "../helpers/generatePokemonData.js";
import Battle from "../models/battleModel.js";
import generateUUID from "../helpers/generateUUID.js";
import { fetchMoveDetails } from "../api/pokeApi.js";
import calculateDamageDealt from "../helpers/calculateDamageDealt.js";
import { IStat } from "../types/pokeTypes.js";

export const switchPokemon = async (req: Request, res: Response) => {
  const { battleId, pokemonId } = req.body;

  try {
    const battle = await Battle.findOne({ id: battleId });
    if (!battle) {
      return res.status(404).json({ error: "Battle not found" });
    }

    const activePokemonIndex = battle.playerPokemon.findIndex(
      (pokemon) => pokemon.isInBattle
    );

    const newActivePokemonIndex = battle.playerPokemon.findIndex(
      (pokemon) => pokemon.id === pokemonId
    );

    if (activePokemonIndex === -1 || newActivePokemonIndex === -1) {
      return res.status(400).json({ error: "Pokémon not found" });
    }

    battle.playerPokemon[activePokemonIndex] = {
      ...battle.playerPokemon[activePokemonIndex],
      isInBattle: false,
    };

    battle.playerPokemon[newActivePokemonIndex] = {
      ...battle.playerPokemon[newActivePokemonIndex],
      isInBattle: true,
    };

    battle.currentPlayer = 0;
    battle.turn++;

    battle.log.push({
      message: `${battle.playerPokemon[newActivePokemonIndex].name} is now in battle and  ${battle.playerPokemon[activePokemonIndex].name} is switched out.`,
      turn: battle.turn,
      timestamp: new Date().toISOString(),
    });

    await battle.save();

    return res.status(200).json(battle);
  } catch (error) {
    console.error("Error switching Pokémon:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const gameState = async (req: Request, res: Response) => {
  const battleId = generateUUID();

  try {
    const playerPokemon = req.body.playerPokemon;
    const playerPokemonData = await generatePokemonData(playerPokemon);

    const randomPokemon: number[] = [];
    while (randomPokemon.length < 6) {
      randomPokemon.push(randNumGen(1, 649));
    }

    const computerPokemonData = await generatePokemonData(randomPokemon);

    const getPlayerFirstPokemonSpeed = playerPokemonData[0].stats.find(
      (stat: IStat) => stat.stat.name === "speed"
    );
    const playerFirstPokemonSpeed = getPlayerFirstPokemonSpeed?.base_stat;

    const getComputerFirstPokemonSpeed = computerPokemonData[0].stats.find(
      (stat: IStat) => stat.stat.name === "speed"
    );
    const computerFirstPokemonSpeed = getComputerFirstPokemonSpeed?.base_stat;

    playerPokemonData[0].isInBattle = true;
    computerPokemonData[0].isInBattle = true;

    const battleData = {
      id: battleId,
      playerPokemon: playerPokemonData,
      computerPokemon: computerPokemonData,
      currentPlayer:
        playerFirstPokemonSpeed >= computerFirstPokemonSpeed ? 1 : 0,
      turn: 1,
      status: "ongoing",
      winner: undefined,
      log: [
        {
          message: `Battle started`,
          turn: 0,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const battle = new Battle(battleData);
    await battle.save();

    res.status(200).json(battleData);
  } catch (error) {
    console.error("Error fetching player Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const pokemonAttack = async (req: Request, res: Response) => {
  try {
    const moveUrl = req.body.moveUrl;
    const battleId = req.body.battleId;
    const isPlayer = req.body.isPlayer;
    const battle = await Battle.findOne({ id: battleId });

    if (!battle) {
      return res.status(404).json({ error: "Battle not found" });
    }

    const attackingPokemonIndex = isPlayer
      ? battle.playerPokemon.findIndex((pokemon) => pokemon.isInBattle)
      : battle.computerPokemon.findIndex((pokemon) => pokemon.isInBattle);

    const defendingPokemonIndex = isPlayer
      ? battle.computerPokemon.findIndex((pokemon) => pokemon.isInBattle)
      : battle.playerPokemon.findIndex((pokemon) => pokemon.isInBattle);

    if (attackingPokemonIndex === -1 || defendingPokemonIndex === -1) {
      return res.status(400).json({ error: "No active Pokemon found" });
    }

    const attackingPokemon = isPlayer
      ? battle.playerPokemon[attackingPokemonIndex]
      : battle.computerPokemon[attackingPokemonIndex];
    const defendingPokemon = isPlayer
      ? battle.computerPokemon[defendingPokemonIndex]
      : battle.playerPokemon[defendingPokemonIndex];

    const getHpStat = defendingPokemon.stats.find(
      (stat: IStat) => stat.stat.name === "hp"
    );
    const opponentPokemonHP = getHpStat ? getHpStat.base_stat : 0;

    const moveData = await fetchMoveDetails(moveUrl);
    const damage = calculateDamageDealt(
      attackingPokemon,
      defendingPokemon,
      moveData
    );

    defendingPokemon.damage += damage;

    if (defendingPokemon.damage >= opponentPokemonHP) {
      defendingPokemon.isFainted = true;
    }

    isPlayer
      ? (battle.computerPokemon[defendingPokemonIndex] = defendingPokemon)
      : (battle.playerPokemon[defendingPokemonIndex] = defendingPokemon);

    battle.currentPlayer = isPlayer ? 0 : 1;
    battle.turn++;

    if (battle.computerPokemon.every((pokemon) => pokemon.isFainted)) {
      battle.status = "finished";
      battle.winner = "player";
    } else if (battle.playerPokemon.every((pokemon) => pokemon.isFainted)) {
      battle.status = "finished";
      battle.winner = "computer";
    }

    battle.log.push({
      message: `${attackingPokemon.name} used ${
        moveData.name
      } and dealt ${damage} damage to ${defendingPokemon.name}${
        defendingPokemon.isFainted ? " and fainted." : ""
      }${
        battle.status === "finished"
          ? ` winner: ${battle.winner}, all Pokemon have fainted`
          : ""
      }`,
      turn: battle.turn,
      timestamp: new Date().toISOString(),
    });

    await battle.save();

    return res.status(200).json({ message: "Attack successful" });
  } catch (error) {
    console.error("Error during attack:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGameState = async (req: Request, res: Response) => {
  const battleId = req.params.battleId;

  try {
    const battle = await Battle.findOne({ id: battleId });
    if (!battle) {
      return res.status(404).json({ error: "Battle not found" });
    }

    return res.status(200).json(battle);
  } catch (error) {
    console.error("Error fetching battle:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const switchComputerPokemon = async (req: Request, res: Response) => {
  try {
    const battleId = req.body.battleId;
    const battle = await Battle.findOne({ id: battleId });

    if (!battle) {
      return res.status(404).json({ error: "Battle not found" });
    }

    const activePokemonIndex = battle.computerPokemon.findIndex(
      (pokemon) => pokemon.isInBattle
    );

    if (activePokemonIndex === -1) {
      return res.status(400).json({ error: "No active Pokemon found" });
    }

    const newActivePokemonIndex = activePokemonIndex + 1;

    if (newActivePokemonIndex >= battle.computerPokemon.length) {
      // Return the currently active Pokemon if there is no Pokemon to switch to
      return res.status(200).json(battle);
    }

    battle.computerPokemon[activePokemonIndex] = {
      ...battle.computerPokemon[activePokemonIndex],
      isInBattle: false,
    };

    battle.computerPokemon[newActivePokemonIndex] = {
      ...battle.computerPokemon[newActivePokemonIndex],
      isInBattle: true,
    };

    battle.currentPlayer = 1;
    battle.turn++;

    battle.log.push({
      message: `${battle.computerPokemon[newActivePokemonIndex].name} is now in battle and ${battle.computerPokemon[activePokemonIndex].name} is switched out.`,
      turn: battle.turn,
      timestamp: new Date().toISOString(),
    });

    await battle.save();

    return res.status(200).json(battle);
  } catch (error) {
    console.error("Error switching Pokémon:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBattle = async (req: Request, res: Response) => {
  try {
    const battleId = req.params.battleId;

    const result = await Battle.deleteOne({ id: battleId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Battle not found" });
    }

    return res.status(200).json({ message: "Battle deleted" });
  } catch (error) {
    console.error("Error deleting battle:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
