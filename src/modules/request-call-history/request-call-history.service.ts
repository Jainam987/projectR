import { Injectable } from '@nestjs/common';
import { CreateRequestCallHistoryDto } from './dto/create-request-call-history.dto';
import { UpdateRequestCallHistoryDto } from './dto/update-request-call-history.dto';

@Injectable()
export class RequestCallHistoryService {
  create(createRequestCallHistoryDto: CreateRequestCallHistoryDto) {
    return 'This action adds a new requestCallHistory';
  }

  findAll() {
    return `This action returns all requestCallHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestCallHistory`;
  }

  update(id: number, updateRequestCallHistoryDto: UpdateRequestCallHistoryDto) {
    return `This action updates a #${id} requestCallHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestCallHistory`;
  }
}
