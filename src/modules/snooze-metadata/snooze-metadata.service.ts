import { Injectable } from '@nestjs/common';
import { CreateSnoozeMetadatumDto } from './dto/create-snooze-metadatum.dto';
import { UpdateSnoozeMetadatumDto } from './dto/update-snooze-metadatum.dto';

@Injectable()
export class SnoozeMetadataService {
  create(createSnoozeMetadatumDto: CreateSnoozeMetadatumDto) {
    return 'This action adds a new snoozeMetadatum';
  }

  findAll() {
    return `This action returns all snoozeMetadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snoozeMetadatum`;
  }

  update(id: number, updateSnoozeMetadatumDto: UpdateSnoozeMetadatumDto) {
    return `This action updates a #${id} snoozeMetadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} snoozeMetadatum`;
  }
}
