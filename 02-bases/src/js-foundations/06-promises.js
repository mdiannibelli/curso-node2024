const { http } = require('../plugins')

const getPokemonsById = async(id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        // HTTPS CLIENT PLUGIN & async
        const pokemon = await http.get(url)
        return pokemon.name;
        
    } catch (error) {
        throw new Error("Pokemon no existe")
    }
    
    /* return fetch(url)
    .then(response => response.json())
    .then(pokemon => pokemon.name); */
    
    
}

module.exports = {
    getPokemonsById
}