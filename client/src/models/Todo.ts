import { ListType } from './List';

export type TodoType = {
  id: string;
  title: string;
  status: boolean;
  description?: string;
};

export type CreateTodoRequest = {
  listId: string;
  title: string;
  description?: string;
};

export type CreateTodoResponse = {
  id: string;
  title: string;
  status: boolean;
  list: ListType;
  description?: string;
};

export type UpdateTodoRequest = {
  id: string;
  title: string;
  description?: string;
  status?: boolean;
};

export type UpdateTodoResponse = {
  list: ListType;
  id: string;
  title: string;
  status: boolean;
  description?: string;
};

export type DeleteTodoRequest = {
  listId: string;
  id: string;
};

export type DeleteTodoResponse = {
  listId: string;
  id: string;
};
