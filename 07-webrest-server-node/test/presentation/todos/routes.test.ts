import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgresql';

// https://github.com/ladjs/supertest/blob/master/README.md
describe('Todo route testing', () => {
    beforeAll(async () => {
        await testServer.start();
    })

    afterAll(() => {
        testServer.close();
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    const todo1 = { id: 1, text: 'Hello todo 1', completedAt: new Date('2024-12-02') };
    const todo2 = { id: 2, text: 'Hello todo 2', completedAt: new Date('2024-10-02') };

    test('should return TODOs /api/todos', async () => {
        await prisma.todo.createMany({
            data: [todo1, todo2]
        })
        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
    });

    test('should return a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt!.toISOString()
        })
    });

    test('should return a 404 NotFound api/todos/:id', async () => {
        const todoId = 999
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: 'Todo with id 999 not found' });
    });

    test('should return a new Todo api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })
    });

    test('should return an error if text is not valid api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ error: 'Text required' });
    });

    test('should return an updated todo api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: { text: "Hola mundo" } });
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Bye world', completedAt: '2024-10-22' })
            .expect(200)

        expect(body).toEqual({ id: expect.any(Number), text: 'Bye world', completedAt: '2024-10-22T00:00:00.000Z' })
    });

    test('should return 404 if TODO not found api/todos/:id', async () => {
        const todoId = 999
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({ text: 'Bye world', completedAt: '2024-10-24' })
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
    });

    test('should return an updated TODO only the date api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: { text: "Hola mundo 2" } });
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt: '2024-10-24' })
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: 'Hola mundo 2',
            completedAt: '2024-10-24T00:00:00.000Z'
        })
    });

    test('should delete a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: { text: "Hola mundo" } });
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({ id: expect.any(Number), text: 'Hola mundo', completedAt: null })
    });

    test('should return 404 if TODO to delete not found api/todos/:id', async () => {
        const todoId = 999;
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
    });
})