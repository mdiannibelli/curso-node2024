import { http } from "../../src/plugins/https-client";

describe('plugins/http-client.ts', () => {
    test('httpsClient.get() should return a string', async() => {
         const data = await http.get('https://jsonplaceholder.typicode.com/todos/1');

         expect(data).toEqual({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: expect.any(Boolean)
         })
    })

    test('httpsClient should has GET, POST, PUT and DELETE methods', () => {
        expect(typeof http.delete).toBe('function');
        expect(typeof http.post).toBe('function');
        expect(typeof http.put).toBe('function');
        expect(typeof http.get).toBe('function');
    })
})