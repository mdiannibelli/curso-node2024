import { getUserById } from "../../src/js-foundations/03-callbacks";

describe("js-foundations/03-callbacks.js", () => {
    test('getUserById should return an error if user does not exist', (done) => {
        const id = 10;
        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id: ${id}`)
            expect(user).toBeUndefined();

            done(); // NO termines el test hasta que llame al done()
        
        })
    })

    test('getUserById should return an object with id and name', (done) => {
        const id = 1;

        getUserById(id, (err, user) => {
            expect(err).toBeNull();
            expect(user).toEqual({
                id: 1,
                name: 'John Doe'
            })

            done();
        })
    })
})