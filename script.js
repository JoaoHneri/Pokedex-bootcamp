const pokemonListDoc = document.querySelector("#pokemonList");

function convertPokemonTypesToLi(pokemonTypes){
  return pokemonTypes.map((typeSlot)=> `<li class="type">${typeSlot.type.name}</li>`)
}

function returnPokemon(pokemon){
  return `<li class="pokemon">
  <span class="number">#${pokemon.order}</span>
  <span class="name">${pokemon.name}</span>
  <div class="detail">
      <ol class="types">
          ${convertPokemonTypesToLi(pokemon.types).join('')}
      </ol>
      <img src="${pokemon.sprites.other.dream_world.front_default }">
  </div>   
</li>`
}

pokeApi.getPokemons().then((pokemonList = [])=>{
  const newHtml = pokemonList.map(returnPokemon).join('');
  pokemonListDoc.innerHTML = newHtml;
})


