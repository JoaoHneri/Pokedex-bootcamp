const pokeApi ={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id; // Use "id" em vez de "order"
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

    pokeApi.getPokemonsDetails = (pokemon) => {
        return fetch(pokemon.url).then((response)=> response.json())
        .then(convertPokeApiDetailToPokemon);
    }

    pokeApi.getPokemons = (off, lim) => {
        const offset = off;
        const limit = lim;
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`; 
        return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequets) => Promise.all(detailRequets))
        .then((pokemonDetails) => pokemonDetails)
    }
