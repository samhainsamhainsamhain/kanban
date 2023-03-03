import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/typeorm/entities/List';
import { Todo } from 'src/typeorm/entities/Todo';
import { Repository } from 'typeorm';
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  UpdateTodoRequest,
} from './todos.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,

    @InjectRepository(List)
    private todoListsRepository: Repository<List>,
  ) {}

  async fetchTodos(id: number) {
    const todos = await this.todosRepository
      .createQueryBuilder()
      .where('todoListId = :id', { id })
      .getMany();

    return todos;
  }

  async createTodo(createTodoDetails: CreateTodoRequest) {
    const todoList = await this.todoListsRepository.findOneBy({
      id: createTodoDetails.listId,
    });

    if (!todoList) {
      throw new HttpException('Todo List not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.todosRepository.save({
      ...createTodoDetails,
      todoList,
    });
  }

  async updateTodoById(updateTodoDetails: UpdateTodoRequest) {
    const todo = await this.todosRepository.findOneBy({
      id: updateTodoDetails.id,
    });

    if (!todo)
      throw new HttpException('Todo not found.', HttpStatus.BAD_REQUEST);

    return await this.todosRepository.update(
      { id: updateTodoDetails.id },
      { ...updateTodoDetails },
    );
  }

  async deleteTodoById(id: DeleteTodoRequest) {
    return await this.todosRepository.delete(id);
  }
}
