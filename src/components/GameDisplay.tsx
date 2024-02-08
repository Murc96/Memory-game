import { Pokemon } from "../ts/interfaces/global_interfaces";
import usePokemonData from "./usePokemonData";
import GameOverDisplay from "./GameOverDisplay";
import GameStartDisplay from "./GameStartDisplay";

export default function GameDisplay() {
  const [
    selectedPokemon,
    score,
    bestScore,
    handleClick,
    gameOverStatus,
    gameStarted,
    startGame,
    resetGame,
  ] = usePokemonData();

  return (
    <>
      {(() => {
        if (gameStarted)
          return (
            <>
              <div className="container sticky">
                <p>Score: {score as number}</p>
                <p>Best Score: {bestScore as number}</p>
              </div>
              <div className="container">
                {" "}
                {(selectedPokemon as Pokemon[]).map((pokemon) => (
                  <div
                    className="card"
                    key={pokemon.id}
                    onClick={() =>
                      (handleClick as (id: number) => void)(pokemon.id)
                    }
                  >
                    <img className="cardImg" src={pokemon.image} />
                  </div>
                ))}
              </div>
            </>
          );
        if (gameOverStatus as boolean)
          return (
            <GameOverDisplay
              score={score as number}
              bestScore={bestScore as number}
              resetGame={resetGame as () => boolean}
            />
          );
        else return <GameStartDisplay startGame={startGame as () => boolean} />;
      })()}
    </>
  );
}
