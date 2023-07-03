var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import randNumGen from "../helpers/randNumGen.js";
import generatePokemonData from "../helpers/generatePokemonData.js";
import Battle from "../models/battleModel.js";
import generateUUID from "../helpers/generateUUID.js";
import { fetchMoveDetails } from "../api/pokeApi.js";
import calculateDamageDealt from "../helpers/calculateDamageDealt.js";
export var switchPokemon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, battleId, pokemonId, battle, activePokemonIndex, newActivePokemonIndex, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, battleId = _a.battleId, pokemonId = _a.pokemonId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Battle.findOne({ id: battleId })];
            case 2:
                battle = _b.sent();
                if (!battle) {
                    return [2 /*return*/, res.status(404).json({ error: "Battle not found" })];
                }
                activePokemonIndex = battle.playerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; });
                newActivePokemonIndex = battle.playerPokemon.findIndex(function (pokemon) { return pokemon.id === pokemonId; });
                if (activePokemonIndex === -1 || newActivePokemonIndex === -1) {
                    return [2 /*return*/, res.status(400).json({ error: "Pokémon not found" })];
                }
                battle.playerPokemon[activePokemonIndex] = __assign(__assign({}, battle.playerPokemon[activePokemonIndex]), { isInBattle: false });
                battle.playerPokemon[newActivePokemonIndex] = __assign(__assign({}, battle.playerPokemon[newActivePokemonIndex]), { isInBattle: true });
                battle.currentPlayer = 0;
                battle.turn++;
                battle.log.push({
                    message: "".concat(battle.playerPokemon[newActivePokemonIndex].name, " is now in battle and  ").concat(battle.playerPokemon[activePokemonIndex].name, " is switched out."),
                    turn: battle.turn,
                    timestamp: new Date().toISOString(),
                });
                return [4 /*yield*/, battle.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json(battle)];
            case 4:
                error_1 = _b.sent();
                console.error("Error switching Pokémon:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var gameState = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var battleId, playerPokemon, playerPokemonData, randomPokemon, computerPokemonData, getPlayerFirstPokemonSpeed, playerFirstPokemonSpeed, getComputerFirstPokemonSpeed, computerFirstPokemonSpeed, battleData, battle, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                battleId = generateUUID();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                playerPokemon = req.body.playerPokemon;
                return [4 /*yield*/, generatePokemonData(playerPokemon)];
            case 2:
                playerPokemonData = _a.sent();
                randomPokemon = [];
                while (randomPokemon.length < 6) {
                    randomPokemon.push(randNumGen(1, 649));
                }
                return [4 /*yield*/, generatePokemonData(randomPokemon)];
            case 3:
                computerPokemonData = _a.sent();
                getPlayerFirstPokemonSpeed = playerPokemonData[0].stats.find(function (stat) { return stat.stat.name === "speed"; });
                playerFirstPokemonSpeed = getPlayerFirstPokemonSpeed === null || getPlayerFirstPokemonSpeed === void 0 ? void 0 : getPlayerFirstPokemonSpeed.base_stat;
                getComputerFirstPokemonSpeed = computerPokemonData[0].stats.find(function (stat) { return stat.stat.name === "speed"; });
                computerFirstPokemonSpeed = getComputerFirstPokemonSpeed === null || getComputerFirstPokemonSpeed === void 0 ? void 0 : getComputerFirstPokemonSpeed.base_stat;
                playerPokemonData[0].isInBattle = true;
                computerPokemonData[0].isInBattle = true;
                battleData = {
                    id: battleId,
                    playerPokemon: playerPokemonData,
                    computerPokemon: computerPokemonData,
                    currentPlayer: playerFirstPokemonSpeed >= computerFirstPokemonSpeed ? 1 : 0,
                    turn: 1,
                    status: "ongoing",
                    winner: undefined,
                    log: [
                        {
                            message: "Battle started",
                            turn: 0,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                };
                battle = new Battle(battleData);
                return [4 /*yield*/, battle.save()];
            case 4:
                _a.sent();
                res.status(200).json(battleData);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error("Error fetching player Pokémon:", error_2);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
export var pokemonAttack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var moveUrl, battleId, isPlayer, battle, attackingPokemonIndex, defendingPokemonIndex, attackingPokemon, defendingPokemon, getHpStat, defendingPokemonHP, moveData, damage, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                moveUrl = req.body.moveUrl;
                battleId = req.body.battleId;
                isPlayer = req.body.isPlayer;
                return [4 /*yield*/, Battle.findOne({ id: battleId })];
            case 1:
                battle = _a.sent();
                if (!battle) {
                    return [2 /*return*/, res.status(404).json({ error: "Battle not found" })];
                }
                attackingPokemonIndex = isPlayer
                    ? battle.playerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; })
                    : battle.computerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; });
                defendingPokemonIndex = isPlayer
                    ? battle.computerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; })
                    : battle.playerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; });
                if (attackingPokemonIndex === -1 || defendingPokemonIndex === -1) {
                    return [2 /*return*/, res.status(400).json({ error: "No active Pokemon found" })];
                }
                attackingPokemon = isPlayer
                    ? battle.playerPokemon[attackingPokemonIndex]
                    : battle.computerPokemon[attackingPokemonIndex];
                defendingPokemon = isPlayer
                    ? battle.computerPokemon[defendingPokemonIndex]
                    : battle.playerPokemon[defendingPokemonIndex];
                getHpStat = defendingPokemon.stats.find(function (stat) { return stat.stat.name === "hp"; });
                defendingPokemonHP = getHpStat ? getHpStat.base_stat : 0;
                return [4 /*yield*/, fetchMoveDetails(moveUrl)];
            case 2:
                moveData = _a.sent();
                damage = calculateDamageDealt(attackingPokemon, defendingPokemon, moveData);
                defendingPokemon.damage += damage;
                if (defendingPokemon.damage >= defendingPokemonHP) {
                    defendingPokemon.damage = defendingPokemonHP;
                    defendingPokemon.isFainted = true;
                }
                isPlayer
                    ? (battle.computerPokemon[defendingPokemonIndex] = defendingPokemon)
                    : (battle.playerPokemon[defendingPokemonIndex] = defendingPokemon);
                battle.currentPlayer = isPlayer ? 0 : 1;
                battle.turn++;
                if (battle.computerPokemon.every(function (pokemon) { return pokemon.isFainted; })) {
                    battle.status = "finished";
                    battle.winner = "player";
                }
                else if (battle.playerPokemon.every(function (pokemon) { return pokemon.isFainted; })) {
                    battle.status = "finished";
                    battle.winner = "computer";
                }
                battle.log.push({
                    message: "".concat(attackingPokemon.name, " used ").concat(moveData.name, " and dealt ").concat(damage, " damage to ").concat(defendingPokemon.name).concat(defendingPokemon.isFainted ? " and fainted." : "").concat(battle.status === "finished"
                        ? " winner: ".concat(battle.winner, ", all Pokemon have fainted")
                        : ""),
                    turn: battle.turn,
                    timestamp: new Date().toISOString(),
                });
                return [4 /*yield*/, battle.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Attack successful" })];
            case 4:
                error_3 = _a.sent();
                console.error("Error during attack:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var getGameState = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var battleId, battle, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                battleId = req.params.battleId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Battle.findOne({ id: battleId })];
            case 2:
                battle = _a.sent();
                if (!battle) {
                    return [2 /*return*/, res.status(404).json({ error: "Battle not found" })];
                }
                return [2 /*return*/, res.status(200).json(battle)];
            case 3:
                error_4 = _a.sent();
                console.error("Error fetching battle:", error_4);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var switchComputerPokemon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var battleId, battle, activePokemonIndex, newActivePokemonIndex, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                battleId = req.body.battleId;
                return [4 /*yield*/, Battle.findOne({ id: battleId })];
            case 1:
                battle = _a.sent();
                if (!battle) {
                    return [2 /*return*/, res.status(404).json({ error: "Battle not found" })];
                }
                activePokemonIndex = battle.computerPokemon.findIndex(function (pokemon) { return pokemon.isInBattle; });
                if (activePokemonIndex === -1) {
                    return [2 /*return*/, res.status(400).json({ error: "No active Pokemon found" })];
                }
                newActivePokemonIndex = activePokemonIndex + 1;
                if (newActivePokemonIndex >= battle.computerPokemon.length) {
                    return [2 /*return*/, res.status(200).json(battle)];
                }
                battle.computerPokemon[activePokemonIndex] = __assign(__assign({}, battle.computerPokemon[activePokemonIndex]), { isInBattle: false });
                battle.computerPokemon[newActivePokemonIndex] = __assign(__assign({}, battle.computerPokemon[newActivePokemonIndex]), { isInBattle: true });
                battle.currentPlayer = 1;
                battle.turn++;
                battle.log.push({
                    message: "".concat(battle.computerPokemon[newActivePokemonIndex].name, " is now in battle and ").concat(battle.computerPokemon[activePokemonIndex].name, " is switched out."),
                    turn: battle.turn,
                    timestamp: new Date().toISOString(),
                });
                return [4 /*yield*/, battle.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json(battle)];
            case 3:
                error_5 = _a.sent();
                console.error("Error switching Pokémon:", error_5);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var deleteBattle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var battleId, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                battleId = req.params.battleId;
                return [4 /*yield*/, Battle.deleteOne({ id: battleId })];
            case 1:
                result = _a.sent();
                if (result.deletedCount === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Battle not found" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "Battle deleted" })];
            case 2:
                error_6 = _a.sent();
                console.error("Error deleting battle:", error_6);
                return [2 /*return*/, res.status(500).json({ error: "Internal Server Error" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
