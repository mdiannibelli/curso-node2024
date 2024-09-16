import { buildMakePerson } from "../../src/js-foundations/05-factoryFunction";

describe('js-foundations/factoryFunction.js', () => {
    const getUuid = () => '1234';
    const getAge = () => 35;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({getUuid, getAge});
        expect(typeof makePerson).toBe('function')
    })

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({getUuid, getAge});
        const johnDoe = makePerson({name: "John Doe", birthdate: "1985-10-21"});

        expect(johnDoe).toEqual({
            id: johnDoe.id,
            name: johnDoe.name,
            birthdate: johnDoe.birthdate,
            age: johnDoe.age
        })
    })
})