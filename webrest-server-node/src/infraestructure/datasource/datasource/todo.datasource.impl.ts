import { prisma } from "../../../data/postgresql";
import { TodoDatasource } from "../../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";

//! PRISMA DATA SOURCE 
export class TodoDataSourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({ data: createTodoDto });
        return TodoEntity.fromJson(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromJson(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        })
        if (!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromJson(todo);
    }

    async deleteTodoById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) throw `Todo with id ${id} not found`;

        const deleted = await prisma.todo.delete({ where: { id } });
        return TodoEntity.fromJson(deleted);
    }

    async updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updatedTodoDto.id);
        if (!todo) throw `Todo with id ${updatedTodoDto.id} not found`;

        const updatedTodo = await prisma.todo.update({
            where: { id: updatedTodoDto.id },
            data: updatedTodoDto.values
        })

        return TodoEntity.fromJson(updatedTodo);
    }
}