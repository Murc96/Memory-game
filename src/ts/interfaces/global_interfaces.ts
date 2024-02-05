export interface Pokemon {
    name: string;
    image: string;
}

export interface PokemonData {
    id: number;
    name: string;
    url: string;
    sprites: {
        front_default: string;
    }
}