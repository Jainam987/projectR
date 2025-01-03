import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesMetadatumDto } from './create-roles-metadatum.dto';

export class UpdateRolesMetadatumDto extends PartialType(CreateRolesMetadatumDto) {}
