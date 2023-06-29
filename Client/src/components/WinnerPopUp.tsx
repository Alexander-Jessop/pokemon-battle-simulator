import React from "react";
import { IBattleData, ILogs } from "../types/ApiType";
import formatTimestamp from "../helpers/formatTimestamp";

interface IGameFinishedModal {
  gameState: IBattleData;
  onClose: () => void;
}

const GameFinishedModal = ({ gameState, onClose }: IGameFinishedModal) => {
  const { log, turn, winner } = gameState;
  const turnIndex = turn - 1;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black
    bg-opacity-50"
    >
      <div className="rounded-lg bg-white p-8">
        <h2 className="mb-4 text-2xl font-bold">Game Finished</h2>
        <h3 className="mb-2 text-xl">Winner: {winner}</h3>
        <p className="mb-4">
          Game Started: {formatTimestamp(log[0].timestamp)}
        </p>
        <p className="mb-4">
          Game Ended: {formatTimestamp(log[turnIndex].timestamp)}
        </p>
        <p>Turn: {turn}</p>
        <h3 className="mt-6 text-lg font-bold">Game Log</h3>
        <div className="mt-2 h-40 overflow-y-scroll border border-gray-300 p-2">
          {log.map((entry: ILogs, index: number) => (
            <p key={index}>{entry.message}</p>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="rounded bg-primary-300 px-4 py-2 text-white
            hover:bg-primary-600"
            onClick={onClose}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameFinishedModal;
