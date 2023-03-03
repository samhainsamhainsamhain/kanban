import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/typeorm/entities/List';
import { Todo } from 'src/typeorm/entities/Todo';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, List])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
