import { useState, useEffect } from "react";
import { Pokemon, PokemonData } from "../ts/interfaces/global_interfaces";

export default function GameDisplay() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
    const [selectedIds, setSelectedIds] = useState<Number[]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        setSelectedPokemon(randomSelection(allPokemon, 12));
    }, [allPokemon]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();

            const pokemonList = data.results;



            const promises = pokemonList.map(async (pokemon: PokemonData) => {
                const response = await fetch(pokemon.url);
                const pokemonData: PokemonData = await response.json();
                return {
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    id: pokemonData.id,
                }
            });

            const resolvedPokemonData = await Promise.all<Pokemon>(promises);
            setAllPokemon(resolvedPokemonData);

        } catch (error) {
            console.error("Error fetching Data:", error)
        }
    }

    const randomSelection = (allPokemon: Pokemon[], count: number): Pokemon[] => {
        const shuffledCards = shuffleArray(allPokemon);

        return shuffledCards.splice(0, count);
    }

    const shuffleArray = (allPokemon: Pokemon[]): Pokemon[] => {
        const newArray = [...allPokemon];

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }

    const handleClick = (id: number) => {
        if (selectedIds.includes(id)) {
            resetGame();

        } else {

            setSelectedIds([...selectedIds, id]);
            setScore(score + 1);

            if (score + 1 > bestScore) {
                setBestScore(score + 1);
            }

            const shuffledCards = shuffleArray(selectedPokemon);
            setSelectedPokemon(shuffledCards);
        }
    }

    const resetGame = () => {
        console.log("game over")
        setScore(0);
        setSelectedIds([]);
        setSelectedPokemon(randomSelection(allPokemon, 12));
    }

    return (
        <>
            <div> {selectedPokemon.map((pokemon, index) => (
                <div className="card" key= {index} onClick={() => handleClick(pokemon.id)} >
                <img src={pokemon.image}/>
                    <div className="nameContainer">
                        <h4>{pokemon.name}</h4>
                    </div>
            </div>
            ))}
            </div>

            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </>
    )
}