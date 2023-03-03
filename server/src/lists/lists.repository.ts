import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/typeorm/entities/List';
import { Repository } from 'typeorm';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List) private readonly Lists: Repository<List>,
  ) {}

  async insertOne(data: Partial<List>): Promise<List> {
    const list = this.Lists.create(data);

    return await this.Lists.save(list);
  }

  async findOneById(id: number): Promise<List> {
    return this.Lists.findOneBy({ id });
  }
}
