import { Request, Response } from "express"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import { GetTodos } from "../../domain/use-cases/todo/get-todos";
import { GetTodoById } from "../../domain/use-cases/todo/get-todo";
import { CreateTodo } from "../../domain/use-cases/todo/create-todo";
import { UpdateTodo } from "../../domain/use-cases/todo/update-todo";
import { DeleteTodo } from "../../domain/use-cases/todo/delete-todo";
import { CustomError } from "../../domain/errors/custom.error";

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

    private handleErrorResponse = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Internal Server error - check logs' })
    }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(err => this.handleErrorResponse(res, err))
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodoById(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(err => this.handleErrorResponse(res, err))
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createdTodoDto] = CreateTodoDto.create(req.body);
        if (error || !createdTodoDto) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
            .execute(createdTodoDto)
            .then(createdTodo => res.status(201).json(createdTodo))
            .catch(err => this.handleErrorResponse(res, err))
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        const [error, updatedTodoDto] = UpdateTodoDto.update({ ...req.body, id })
        if (error || !updatedTodoDto) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updatedTodoDto)
            .then(updatedTodo => res.json(updatedTodo))
            .catch(err => this.handleErrorResponse(res, err))
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json("id must be a number");

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(deletedTodo => res.json(deletedTodo))
            .catch(err => this.handleErrorResponse(res, err))
    }
}