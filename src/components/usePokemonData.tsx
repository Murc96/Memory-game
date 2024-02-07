import { useState, useEffect } from "react";
import { Pokemon, PokemonDataType } from "../ts/interfaces/global_interfaces";

export default function usePokemonData() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const [selectedIds, setSelectedIds] = useState<Number[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOverStatus, setGameOverStatus] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedPokemon(randomSelection(allPokemon, 12));
  }, [allPokemon]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();

      const pokemonList = data.results;

      const promises = pokemonList.map(async (pokemon: PokemonDataType) => {
        const response = await fetch(pokemon.url);
        const pokemonData: PokemonDataType = await response.json();
        return {
          name: pokemonData.name.toUpperCase(),
          image: pokemonData.sprites.front_default,
          id: pokemonData.id,
        };
      });

      const resolvedPokemonData = await Promise.all<Pokemon>(promises);
      setAllPokemon(resolvedPokemonData);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const randomSelection = (allPokemon: Pokemon[], count: number): Pokemon[] => {
    const shuffledCards = shuffleArray(allPokemon);

    return shuffledCards.splice(0, count);
  };

  const shuffleArray = (allPokemon: Pokemon[]): Pokemon[] => {
    const newArray = [...allPokemon];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const handleClick = (id: number) => {
    if (selectedIds.includes(id)) {
      gameOver();
    } else {
      setSelectedIds([...selectedIds, id]);
      setScore(score + 1);

      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }

      const shuffledCards = shuffleArray(selectedPokemon);
      setSelectedPokemon(shuffledCards);
    }
  };

  const gameOver = () => {
    setGameOverStatus(true);
    setGameStarted(false);
  };

  const resetGame = () => {
    setScore(0);
    setSelectedIds([]);
    setSelectedPokemon(randomSelection(allPokemon, 12));
    setGameOverStatus(false);
    setGameStarted(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return [
    selectedPokemon,
    score,
    bestScore,
    handleClick,
    gameOverStatus,
    gameStarted,
    startGame,
    resetGame,
  ];
}
