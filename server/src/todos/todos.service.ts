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
    private listsRepository: Repository<List>,
  ) {}

  async fetchTodos(id: number) {
    const todos = await this.todosRepository
      .createQueryBuilder()
      .where('listId = :id', { id })
      .getMany();

    return todos;
  }

  async createTodo(createTodoDetails: CreateTodoRequest) {
    const list = await this.listsRepository.findOneBy({
      id: createTodoDetails.listId,
    });

    if (!list) {
      throw new HttpException('Todo List not found.', HttpStatus.BAD_REQUEST);
    }

    const newTodo = this.todosRepository.create({
      ...createTodoDetails,
      list,
    });

    return await this.todosRepository.save(newTodo);
  }

  async updateTodoById(updateTodoDetails: UpdateTodoRequest) {
    const todo = await this.todosRepository.findOneBy({
      id: updateTodoDetails.id,
    });

    if (!todo)
      throw new HttpException('Todo not found.', HttpStatus.BAD_REQUEST);

    await this.todosRepository.save({
      ...todo,
      ...updateTodoDetails,
    });

    return await this.todosRepository.findOne({
      where: { id: updateTodoDetails.id },
      relations: { list: true },
    });
  }

  async deleteTodoById(id: DeleteTodoRequest) {
    return await this.todosRepository.delete(id);
  }
}
