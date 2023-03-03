import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateListRequest,
  DeleteListRequest,
  UpdateListRequest,
} from './lists.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async fetchLists() {
    return await this.listsService.fetchLists();
  }

  @Post()
  createList(@Body() createListDto: CreateListRequest) {
    return this.listsService.createList(createListDto);
  }

  @Put()
  async updateList(@Body() updateListDto: UpdateListRequest) {
    await this.listsService.updateList(updateListDto);
    return updateListDto;
  }

  @Delete()
  deleteList(@Body() deleteListDetails: DeleteListRequest) {
    return this.listsService.deleteList(deleteListDetails);
  }
}
