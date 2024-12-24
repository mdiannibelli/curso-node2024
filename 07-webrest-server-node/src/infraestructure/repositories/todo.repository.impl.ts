import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datasource: TodoDatasource
    ) {

    }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updatedTodoDto);
    }
    deleteTodoById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteTodoById(id);
    }

}