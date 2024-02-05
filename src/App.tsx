import { useState, useEffect } from 'react'
import { Pokemon, PokemonData } from './ts/interfaces/global_interfaces';

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [cards, setCards] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();

      const pokemonList = data.results;



      const promises = pokemonList.map(async (pokemon: PokemonData) => {
        const response = await fetch(pokemon.url);
        const pokemonData: PokemonData = await response.json();
        console.log(pokemonData)
        return {
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
        }
      });

      const resolvedPokemonData = await Promise.all<Pokemon>(promises);
      console.log(resolvedPokemonData)
      setAllPokemon(resolvedPokemonData);

      console.log(allPokemon);
    } catch (error) {
      console.error("Error fetching Data:", error)
    }


    return (
      <>
        <div> {allPokemon.map((pokemon, index) => (
          <div key={index}>
            <p>{`Name: ${pokemon.name}`}</p>
            <p>{`Abschluss: ${pokemon.image}`}</p>
          </div>
        ))}
        </div>
      </>
    )
  }
}

export default App
