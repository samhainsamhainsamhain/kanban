import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from 'src/typeorm/entities/List';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './lists.repository';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListsService, ListRepository],
  controllers: [ListsController],
})
export class ListsModule {}
