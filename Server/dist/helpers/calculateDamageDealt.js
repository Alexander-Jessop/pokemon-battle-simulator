var calculateTypeEffectiveness = function (moveType, defenderType) {
    var _a;
    var typeChart = {
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
    var effectiveness = ((_a = typeChart[moveType]) === null || _a === void 0 ? void 0 : _a[defenderType]) || 1;
    return effectiveness;
};
var calculateDamageDealt = function (activePokemon, opponentPokemon, moveData) {
    var _a, _b, _c, _d;
    var attackerAttack = (_b = (_a = activePokemon.stats.find(function (stat) { return stat.stat.name === "attack"; })) === null || _a === void 0 ? void 0 : _a.base_stat) !== null && _b !== void 0 ? _b : 0;
    var defenderDefense = (_d = (_c = opponentPokemon.stats.find(function (stat) { return stat.stat.name === "defense"; })) === null || _c === void 0 ? void 0 : _c.base_stat) !== null && _d !== void 0 ? _d : 0;
    var defenderType = opponentPokemon.types[0].type.name;
    var moveType = moveData.type.name;
    var movePower = moveData.power;
    var effectiveness = calculateTypeEffectiveness(moveType, defenderType);
    var random = Math.random() * (1.0 - 0.85) + 0.85;
    var isCritical = Math.random() < 0.1;
    var baseDamage = ((0.5 * attackerAttack) / defenderDefense) * (movePower || 1) + 1;
    var damage = Math.floor(baseDamage * effectiveness * random);
    if (isCritical) {
        damage *= 1.25;
    }
    return Math.floor(+damage);
};
export default calculateDamageDealt;
