import { TodoType } from './Todo';

export type ListType = {
  id: number;
  title: string;
  todos: TodoType[];
};
