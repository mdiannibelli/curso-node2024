import { characters } from "../../src/js-foundations/02-desctructuring";

describe("js-foundations/02-desctructuring.js", () => {
    test('characters should contain Flash and Superman', () => {
        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');
    })

    test('First character should be Flash, and second Superman', () => {
        const [ flash, superman ] = characters;
        expect(flash).toBe('Flash');
        expect(superman).toBe('Superman');
    })
})