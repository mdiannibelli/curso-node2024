import { getAge } from "../../src/plugins";

describe('plugins/get-age.plugin.ts', () => {
    test('getAge() should return the age of a person', () => {
        const birthdate = '1985-10-21';
        const age = getAge(birthdate);

        expect(typeof age).toBe('number');
    })

    test('getAge() should return current age', () => {
        const birthdate = '1985-10-21';
        const age = getAge(birthdate);

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(calculatedAge);
    })

    test('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995); // Espiar método del prototype Date que regresa 1995
        //? Esto lo que hace es espiar la funcón y que devuelva 1995 como mock entonces dentro de la función Date.getFullYear() dará 1995
        //! return new Date().getFullYear() => 1995

        const birthdate = '1995-10-21';
        const age = getAge(birthdate);

        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled(); // Que la función getFullYear haya sido llamada
        // expect(spy).toHaveBeenCalledWith({a: 1}) //! Que la función getFullYear haya sido llamada con argumentos
    })
})