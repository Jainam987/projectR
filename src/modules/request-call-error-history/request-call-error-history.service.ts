import { Injectable } from '@nestjs/common';
import { CreateRequestCallErrorHistoryDto } from './dto/create-request-call-error-history.dto';
import { UpdateRequestCallErrorHistoryDto } from './dto/update-request-call-error-history.dto';

@Injectable()
export class RequestCallErrorHistoryService {
  create(createRequestCallErrorHistoryDto: CreateRequestCallErrorHistoryDto) {
    return 'This action adds a new requestCallErrorHistory';
  }

  findAll() {
    return `This action returns all requestCallErrorHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestCallErrorHistory`;
  }

  update(id: number, updateRequestCallErrorHistoryDto: UpdateRequestCallErrorHistoryDto) {
    return `This action updates a #${id} requestCallErrorHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestCallErrorHistory`;
  }
}
