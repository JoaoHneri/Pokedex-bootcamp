const pokemonListDoc = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#carregarMais");
let off = 0;
let lim = 9;
let maxRecords = 151;


function loadPokemonItems(off, lim){
  pokeApi.getPokemons(off, lim).then((pokemonList = [])=>{
    const newHtml = pokemonList.map((pokemon)=>`<li class="pokemon ${pokemon.types[0]}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join(" ")}</ol>
        </ol>
        <img src="${pokemon.photo}">
    </div>   
  </li>`).join('');
    pokemonListDoc.innerHTML += newHtml;
  })
}
loadPokemonItems(off, lim);


loadMoreButton.addEventListener("click", ()=>{

  off += lim;
  const qtdRecordNextpage = off + lim;

  if(qtdRecordNextpage >= maxRecords){
    const newLimit = maxRecords - off;
    loadPokemonItems(off, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }else{
    loadPokemonItems(off, lim);
  }
  
})
