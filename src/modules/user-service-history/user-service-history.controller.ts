import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserServiceHistoryService } from './user-service-history.service';
import { CreateUserServiceHistoryDto } from './dto/create-user-service-history.dto';
import { UpdateUserServiceHistoryDto } from './dto/update-user-service-history.dto';

@Controller('user-service-history')
export class UserServiceHistoryController {
  constructor(private readonly userServiceHistoryService: UserServiceHistoryService) {}

  @Post()
  create(@Body() createUserServiceHistoryDto: CreateUserServiceHistoryDto) {
    return this.userServiceHistoryService.create(createUserServiceHistoryDto);
  }

  @Get()
  findAll() {
    return this.userServiceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userServiceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserServiceHistoryDto: UpdateUserServiceHistoryDto) {
    return this.userServiceHistoryService.update(+id, updateUserServiceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userServiceHistoryService.remove(+id);
  }
}
