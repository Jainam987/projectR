import { Injectable } from '@nestjs/common';
import { CreateUserServiceHistoryDto } from './dto/create-user-service-history.dto';
import { UpdateUserServiceHistoryDto } from './dto/update-user-service-history.dto';

@Injectable()
export class UserServiceHistoryService {
  create(createUserServiceHistoryDto: CreateUserServiceHistoryDto) {
    return 'This action adds a new userServiceHistory';
  }

  findAll() {
    return `This action returns all userServiceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userServiceHistory`;
  }

  update(id: number, updateUserServiceHistoryDto: UpdateUserServiceHistoryDto) {
    return `This action updates a #${id} userServiceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} userServiceHistory`;
  }
}
