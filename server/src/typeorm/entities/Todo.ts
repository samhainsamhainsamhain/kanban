import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from './List';

@Entity({
  name: 'todos',
})
export class Todo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', default: null })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @ManyToOne(() => List, (todoList) => todoList.todos, {
    onDelete: 'CASCADE',
  })
  todoList: List;
}
