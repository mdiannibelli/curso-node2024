import { Request, Response } from "express"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { prisma } from "../../data/postgresql";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

let todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy water', createdAt: new Date() },
    { id: 3, text: 'Buy bread', createdAt: new Date() },
]

export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        // return res.json(todos);
        const todos = await this.todoRepository.getAll(); //! Clean architecture
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try { //! Clean architecture
            const todo = await this.todoRepository.findById(id);
            res.json(todo)
        } catch (error) {
            res.status(400).json({ error })
        }
        //if (isNaN(id)) return res.status(400).json("id must be a number");
        //const todoFound = todos.find(todo => todo.id === id);

        //todoFound ? res.json(todoFound) : res.status(404).json(`Todo with id ${id} not found`);
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
        // todos.push(todo);


        //? Prisma
        //const todo = await prisma.todo.create({
        //    data: createdTodoDto
        //})

        const todo = await this.todoRepository.create(createdTodoDto);
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


        //const updatedTodos = todos.map(todo =>
        //    todo.id === id ? { ...todo, text: text } : todo
        //)

        // todos = updatedTodos;


        //? Prisma
        //const todo = await prisma.todo.findFirst({ where: { id } })
        //const updatedTodo = await prisma.todo.update({
        //    where: { id },
        //    data: updatedTodoDto!.values
        //})

        const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        //const todoFound = todos.find(todo => todo.id === id);
        //if (!todoFound) return res.status(404).json("Todo not found");

        //todos.splice(todos.indexOf(todoFound), 1);
        //res.json(todos);

        const deletedTodo = await this.todoRepository.deleteTodoById(id);
        res.json(deletedTodo);
    }
}