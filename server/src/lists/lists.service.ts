import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/typeorm/entities/List';
import { Repository } from 'typeorm';
import {
  CreateListRequest,
  DeleteListRequest,
  ListResponse,
  UpdateListRequest,
} from './lists.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async fetchLists() {
    return await this.listRepository.find();
  }

  async createList(createListDetails: CreateListRequest) {
    return await this.listRepository.create({
      ...createListDetails,
    });
  }

  async updateList(updateListDetails: UpdateListRequest) {
    const todoList = await this.listRepository.findOneBy({
      id: updateListDetails.id,
    });

    if (!todoList)
      throw new HttpException('List not found.', HttpStatus.BAD_REQUEST);

    return await this.listRepository.update(
      { id: updateListDetails.id },
      { ...updateListDetails },
    );
  }

  async deleteList(deleteListDetails: DeleteListRequest) {
    return await this.listRepository.delete({ id: deleteListDetails.id });
  }
}
