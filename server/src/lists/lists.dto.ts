import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Todo } from 'src/typeorm/entities/Todo';

export class CreateListRequest {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateListRequest {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}

export class DeleteListRequest {
  @IsNumber()
  id: number;
}

export interface ListResponse {
  _id: number;
  title: string;
  todos: Todo[];
}
