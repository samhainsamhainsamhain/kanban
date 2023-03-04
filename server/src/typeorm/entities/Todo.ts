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

  @Column({ type: 'bool', default: false })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @ManyToOne(() => List, (list) => list.todos, {
    onDelete: 'CASCADE',
  })
  list: List;
}
