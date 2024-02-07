interface Props {
  startGame: () => boolean;
}

export default function GameStartDisplay({ startGame }: Props) {
  return (
    <>
      <h1>Memory Game</h1>

      <h2>Rules:</h2>
      <p></p>
      <div className="container containerBtn">
        <button className="start" onClick={startGame as () => boolean}>
          Start
        </button>
      </div>
    </>
  );
}
