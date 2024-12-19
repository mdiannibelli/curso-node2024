import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoByIdUseCase {
    execute(id: number): Promise<TodoEntity>
}

export class GetTodoById implements GetTodoByIdUseCase {
    constructor(
        private readonly repository: TodoRepository
    ) {

    }
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }
}