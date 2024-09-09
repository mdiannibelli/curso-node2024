const { http } = require('../plugins')

const getPokemonsById = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    /* return fetch(url)
    .then(response => response.json())
    .then(pokemon => pokemon.name); */
    
    
    // HTTPS CLIENT PLUGIN & async
    const pokemon = await http.get(url)
    return pokemon.name;
}




module.exports = getPokemonsById;