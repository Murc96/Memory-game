interface Props {
  score: number;
  bestScore: number;

  resetGame: () => boolean;
}

export default function GameOverDisplay({
  score,
  bestScore,
  resetGame,
}: Props) {
  return (
    <>
      <h1>Game Over</h1>
      <p>Last Score: {score as number}</p>
      <p>Highest Score: {bestScore as number}</p>
      <div className="container containerBtn">
        <button className="retry" onClick={resetGame as () => boolean}>
          Retry
        </button>
      </div>
    </>
  );
}
