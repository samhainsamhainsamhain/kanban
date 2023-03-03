import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Todo } from 'src/typeorm/entities/Todo';

export class CreateTodoRequest {
  @IsNumber()
  listId: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateTodoRequest {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class DeleteTodoRequest {
  @IsNumber()
  id: number;
}

export interface TodoResponse {
  _id: number;
  title: string;
  description?: string;
}
