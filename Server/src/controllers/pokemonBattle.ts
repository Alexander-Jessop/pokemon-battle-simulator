import { Request, Response } from "express";
import randNumGen from "../helpers/randNumGen.js";
import generatePokemonData from "../helpers/generatePokemonData.js";
import Battle from "../models/battleModel.js";
import generateUUID from "../helpers/generateUUID.js";
import { fetchMoveDetails } from "../api/pokeApi.js";
import calculateDamageDealt from "../helpers/calculateDamageDealt.js";

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

    const playerFirstPokemonSpeed = playerPokemonData[0].stats.speed;
    const computerFirstPokemonSpeed = computerPokemonData[0].stats.speed;

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

    const activePokemon = isPlayer
      ? battle.playerPokemon.find((pokemon) => pokemon.isInBattle)
      : battle.computerPokemon.find((pokemon) => pokemon.isInBattle);

    const opponentPokemon = isPlayer
      ? battle.computerPokemon.find((pokemon) => pokemon.isInBattle)
      : battle.playerPokemon.find((pokemon) => pokemon.isInBattle);

    if (!opponentPokemon || !activePokemon) {
      return res.status(400).json({ error: "No active  Pokemon found" });
    }

    const moveData = await fetchMoveDetails(moveUrl);
    const damage = calculateDamageDealt(
      activePokemon,
      opponentPokemon,
      moveData
    );

    opponentPokemon.damage += damage;

    if (opponentPokemon.damage >= opponentPokemon.stats.hp) {
      opponentPokemon.isFainted = true;
    }

    await battle.save();

    return res.status(200).json({ message: "Attack successful" });
  } catch (error) {
    console.error("Error during attack:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
