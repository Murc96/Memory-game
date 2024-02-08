interface Props {
  startGame: () => boolean;
}

export default function GameStartDisplay({ startGame }: Props) {
  return (
    <>
      <h1>Memory Game</h1>
      <div className="rules">
        <p>Rules:</p>
        <p>In this game there is 12 random Pokemons.</p>
        <p>The goal is to click every Pokemon once.</p>
        <p>If you click the same twice the game is lost.</p>
      </div>
      <div className="container containerBtn">
        <button className="start" onClick={startGame as () => boolean}>
          Start
        </button>
      </div>
    </>
  );
}
