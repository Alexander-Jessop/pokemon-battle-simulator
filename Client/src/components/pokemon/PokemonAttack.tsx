type AttackButtonProps = {
  move: string;
  onClick: () => void;
};

const AttackButton = ({ move, onClick }: AttackButtonProps) => (
  <button
    className="rounded bg-secondary-500 px-2 py-1 text-white hover:bg-secondary-600"
    onClick={onClick}
  >
    {move}
  </button>
);

export default AttackButton;
