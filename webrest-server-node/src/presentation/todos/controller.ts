import { Request, Response } from "express"

let todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy water', createdAt: new Date() },
    { id: 3, text: 'Buy bread', createdAt: new Date() },
]

export class TodosController {
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");
        const todoFound = todos.find(todo => todo.id === id);

        todoFound ? res.json(todoFound) : res.status(404).json(`Todo with id ${id} not found`);
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json("Text property required");

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date()
        };
        todos.push(newTodo);
        res.json(newTodo)
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        const { text } = req.body;
        if (!text) return res.status(400).json("Text property required");

        const todoFound = todos.find(todo => todo.id === id);
        if (!todoFound) return res.status(404).json("Todo not found");

        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: text } : todo
        )

        todos = updatedTodos;

        res.json(updatedTodos);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        const todoFound = todos.find(todo => todo.id === id);
        if (!todoFound) return res.status(404).json("Todo not found");

        todos.splice(todos.indexOf(todoFound), 1);
        res.json(todos);
    }
}