import { Request, Response } from "express"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { prisma } from "../../data/postgresql";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

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

    public createTodo = async (req: Request, res: Response) => {
        const [error, createdTodoDto] = CreateTodoDto.create(req.body);
        if (error || !createdTodoDto) return res.status(400).json({ error });

        //if (!text) return res.status(400).json("Text property required");

        //const newTodo = {
        //    id: todos.length + 1,
        //    text: text,
        //    createdAt: new Date()
        //};

        const todo = await prisma.todo.create({
            data: createdTodoDto
        })
        // todos.push(todo);
        res.json(todo)
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        const [error, updatedTodoDto] = UpdateTodoDto.update({ ...req.body, id })
        if (error) return res.status(400).json({ error });

        //const { text } = req.body;
        //if (!text) return res.status(400).json("Text property required");

        //const todoFound = todos.find(todo => todo.id === id);
        //if (!todoFound) return res.status(404).json("Todo not found");

        const todo = await prisma.todo.findFirst({ where: { id } })

        //const updatedTodos = todos.map(todo =>
        //    todo.id === id ? { ...todo, text: text } : todo
        //)

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updatedTodoDto!.values
        })

        // todos = updatedTodos;

        res.json(updatedTodo);
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