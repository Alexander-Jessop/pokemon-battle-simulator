import { Request, Response } from "express";
import randNumGen from "../helpers/randNumGen.js";
import generatePokemonData from "../helpers/generatePokemonData.js";
import Battle from "../models/battleModel.js";
import generateUUID from "../helpers/generateUUID.js";
import { fetchMoveDetails } from "../api/pokeApi.js";
import calculateDamageDealt from "../helpers/calculateDamageDealt.js";
import { IStat } from "../types/pokeTypes.js";

export const switchPokemon = async (req: Request, res: Response) => {
  const battleId = req.params.battleId;
  const selectedPokemonId = req.params.pokemonId;

  try {
    const battle = await Battle.findById(battleId);
    if (!battle) {
      res.status(404).json({ error: "Battle not found" });
      return;
    }

    const playerPokemon = battle.playerPokemon;

    const activePlayerPokemon = playerPokemon.find(
      (pokemon) => pokemon.isInBattle
    );

    if (!activePlayerPokemon) {
      res.status(400).json({ error: "Invalid battle state" });
      return;
    }

    if (selectedPokemonId === activePlayerPokemon.id) {
      res.status(400).json({ error: "Selected Pokémon is already in battle" });
      return;
    }

    activePlayerPokemon.isInBattle = false;

    const selectedPlayerPokemon = playerPokemon.find(
      (pokemon) => pokemon.id === selectedPokemonId
    );
    if (!selectedPlayerPokemon) {
      res.status(404).json({ error: "Selected Pokémon not found" });
      return;
    }
    selectedPlayerPokemon.isInBattle = true;

    await battle.save();

    res.status(200).json(battle);
  } catch (error) {
    console.error("Error switching Pokémon:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
      log: [],
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

    const activePokemonIndex = isPlayer
      ? battle.playerPokemon.findIndex((pokemon) => pokemon.isInBattle)
      : battle.computerPokemon.findIndex((pokemon) => pokemon.isInBattle);

    const opponentPokemonIndex = isPlayer
      ? battle.computerPokemon.findIndex((pokemon) => pokemon.isInBattle)
      : battle.playerPokemon.findIndex((pokemon) => pokemon.isInBattle);

    if (activePokemonIndex === -1 || opponentPokemonIndex === -1) {
      return res.status(400).json({ error: "No active Pokemon found" });
    }

    const activePokemon = battle.playerPokemon[activePokemonIndex];
    const opponentPokemon = battle.computerPokemon[opponentPokemonIndex];
    const getHpStat = opponentPokemon.stats.find(
      (stat: IStat) => stat.stat.name === "hp"
    );
    const opponentPokemonHP = getHpStat ? getHpStat.base_stat : 0;

    const moveData = await fetchMoveDetails(moveUrl);
    const damage = calculateDamageDealt(
      activePokemon,
      opponentPokemon,
      moveData
    );

    opponentPokemon.damage += damage;

    if (opponentPokemon.damage >= opponentPokemonHP) {
      opponentPokemon.isFainted = true;
    }

    battle.currentPlayer = isPlayer ? 0 : 1;
    battle.turn += 1;

    battle.computerPokemon[opponentPokemonIndex] = opponentPokemon;

    await battle.save();

    return res.status(200).json({ message: "Attack successful" });
  } catch (error) {
    console.error("Error during attack:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
