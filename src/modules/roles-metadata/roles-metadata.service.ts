import { Injectable } from '@nestjs/common';
import { CreateRolesMetadatumDto } from './dto/create-roles-metadatum.dto';
import { UpdateRolesMetadatumDto } from './dto/update-roles-metadatum.dto';

@Injectable()
export class RolesMetadataService {
  create(createRolesMetadatumDto: CreateRolesMetadatumDto) {
    return 'This action adds a new rolesMetadatum';
  }

  findAll() {
    return `This action returns all rolesMetadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesMetadatum`;
  }

  update(id: number, updateRolesMetadatumDto: UpdateRolesMetadatumDto) {
    return `This action updates a #${id} rolesMetadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesMetadatum`;
  }
}
