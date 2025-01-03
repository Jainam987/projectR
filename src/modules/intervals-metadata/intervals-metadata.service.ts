import { Injectable } from '@nestjs/common';
import { CreateIntervalsMetadatumDto } from './dto/create-intervals-metadatum.dto';
import { UpdateIntervalsMetadatumDto } from './dto/update-intervals-metadatum.dto';

@Injectable()
export class IntervalsMetadataService {
  create(createIntervalsMetadatumDto: CreateIntervalsMetadatumDto) {
    return 'This action adds a new intervalsMetadatum';
  }

  findAll() {
    return `This action returns all intervalsMetadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intervalsMetadatum`;
  }

  update(id: number, updateIntervalsMetadatumDto: UpdateIntervalsMetadatumDto) {
    return `This action updates a #${id} intervalsMetadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} intervalsMetadatum`;
  }
}
