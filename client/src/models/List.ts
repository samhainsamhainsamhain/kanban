import { TodoType } from './Todo';

export type ListType = {
  id: string;
  title: string;
  todos: TodoType[];
};

export type CreateListRequest = {
  title: string;
};

export type UpdateListRequest = {
  id: string;
  title: string;
};

export type DeleteListRequest = {
  id: string;
};

export type DeleteListResponse = {
  id: string;
};
