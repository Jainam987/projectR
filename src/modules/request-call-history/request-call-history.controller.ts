import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestCallHistoryService } from './request-call-history.service';
import { CreateRequestCallHistoryDto } from './dto/create-request-call-history.dto';
import { UpdateRequestCallHistoryDto } from './dto/update-request-call-history.dto';

@Controller('request-call-history')
export class RequestCallHistoryController {
  constructor(private readonly requestCallHistoryService: RequestCallHistoryService) {}

  @Post()
  create(@Body() createRequestCallHistoryDto: CreateRequestCallHistoryDto) {
    return this.requestCallHistoryService.create(createRequestCallHistoryDto);
  }

  @Get()
  findAll() {
    return this.requestCallHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestCallHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestCallHistoryDto: UpdateRequestCallHistoryDto) {
    return this.requestCallHistoryService.update(+id, updateRequestCallHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestCallHistoryService.remove(+id);
  }
}
