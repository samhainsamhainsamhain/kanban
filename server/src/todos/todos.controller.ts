import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  UpdateTodoRequest,
} from './todos.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async fetchTodosByListId(@Body() listId: number) {
    return await this.todosService.fetchTodos(listId);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoRequest) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Put()
  updateTodo(@Body() updateTodoDto: UpdateTodoRequest) {
    return this.todosService.updateTodoById(updateTodoDto);
  }

  @Delete()
  deleteTodo(@Body() deleteTodoDto: DeleteTodoRequest) {
    return this.todosService.deleteTodoById(deleteTodoDto);
  }
}
