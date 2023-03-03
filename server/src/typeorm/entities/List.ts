import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from './Todo';

@Entity({
  name: 'lists',
})
export class List {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @OneToMany(() => Todo, (todos) => todos.todoList)
  todos: Todo[];
}
