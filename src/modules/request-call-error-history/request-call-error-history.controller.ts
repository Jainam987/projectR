import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestCallErrorHistoryService } from './request-call-error-history.service';
import { CreateRequestCallErrorHistoryDto } from './dto/create-request-call-error-history.dto';
import { UpdateRequestCallErrorHistoryDto } from './dto/update-request-call-error-history.dto';

@Controller('request-call-error-history')
export class RequestCallErrorHistoryController {
  constructor(private readonly requestCallErrorHistoryService: RequestCallErrorHistoryService) {}

  @Post()
  create(@Body() createRequestCallErrorHistoryDto: CreateRequestCallErrorHistoryDto) {
    return this.requestCallErrorHistoryService.create(createRequestCallErrorHistoryDto);
  }

  @Get()
  findAll() {
    return this.requestCallErrorHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestCallErrorHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestCallErrorHistoryDto: UpdateRequestCallErrorHistoryDto) {
    return this.requestCallErrorHistoryService.update(+id, updateRequestCallErrorHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestCallErrorHistoryService.remove(+id);
  }
}
