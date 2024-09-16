import { getPokemonsById} from '../../src/js-foundations/06-promises'

describe("js-foundations/06-promises.js", () => {
    test('getPokemonById should return a pokemon name', async() => {
        const pokemonId = 1;
        const pokemon = await getPokemonsById(pokemonId);

        expect(pokemon).toBe('bulbasaur');
    })

    test('should return an error if pokemon does not exist', async() => {
        const pokemonId = 100000000;
        
        try {
            await getPokemonsById(pokemonId);
            expect(true).toBe(false); // genero el error
        }catch (error) {
            expect(error).toEqual(Error("Pokemon no existe"))
        }

    })
})