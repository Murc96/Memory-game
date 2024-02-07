export interface Pokemon {
    name: string;
    image: string;
    id: number;
}

export interface PokemonDataType {
    id: number;
    name: string;
    url: string;
    sprites: {
        front_default: string;
    }
}