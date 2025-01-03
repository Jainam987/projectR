import { Injectable } from '@nestjs/common';
import { CreateServicesMetadatumDto } from './dto/create-services-metadatum.dto';
import { UpdateServicesMetadatumDto } from './dto/update-services-metadatum.dto';

@Injectable()
export class ServicesMetadataService {
  create(createServicesMetadatumDto: CreateServicesMetadatumDto) {
    return 'This action adds a new servicesMetadatum';
  }

  findAll() {
    return `This action returns all servicesMetadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicesMetadatum`;
  }

  update(id: number, updateServicesMetadatumDto: UpdateServicesMetadatumDto) {
    return `This action updates a #${id} servicesMetadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicesMetadatum`;
  }
}
