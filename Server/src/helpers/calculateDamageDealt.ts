import { IMoveData, IPokemonInfo } from "../types/pokeTypes.js";

const calculateTypeEffectiveness = (
  moveType: string,
  defenderType: string
): number => {
  const typeChart: Record<string, Record<string, number>> = {
    normal: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
    },
    fire: {
      normal: 1,
      fire: 0.5,
      water: 2,
      electric: 1,
      grass: 0.5,
    },
    water: {
      normal: 1,
      fire: 0.5,
      water: 0.5,
      electric: 2,
      grass: 2,
    },
    electric: {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 0.5,
      grass: 1,
    },
    grass: {
      normal: 1,
      fire: 2,
      water: 0.5,
      electric: 1,
      grass: 0.5,
    },
  };

  const effectiveness = typeChart[moveType]?.[defenderType] || 1;

  return effectiveness;
};

const calculateDamageDealt = (
  activePokemon: IPokemonInfo,
  opponentPokemon: IPokemonInfo,
  moveData: IMoveData
): number => {
  const attackerAttack =
    activePokemon.stats.find((stat) => stat.stat.name === "attack")
      ?.base_stat ?? 0;

  const defenderDefense =
    opponentPokemon.stats.find((stat) => stat.stat.name === "defense")
      ?.base_stat ?? 0;

  const defenderType = opponentPokemon.types[0].type.name;

  const moveType = moveData.type.name;
  const movePower = moveData.power;

  const effectiveness = calculateTypeEffectiveness(moveType, defenderType);

  const random = Math.random() * (1.0 - 0.85) + 0.85;
  const isCritical = Math.random() < 0.1;
  const baseDamage =
    ((0.5 * attackerAttack) / defenderDefense) * (movePower || 1) + 1;

  let damage = Math.floor(baseDamage * effectiveness * random);
  if (isCritical) {
    damage *= 1.25;
  }

  return +damage;
};

export default calculateDamageDealt;
