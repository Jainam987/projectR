import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import {
  CreatePasswordDto,
  FindPasswordResponse,
  PasswordResponse,
  UpdatePasswordDto,
} from './dto/password.dto';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  async create(
    @Body() createPasswordDto: CreatePasswordDto,
  ): Promise<PasswordResponse> {
    const password = await this.passwordService.create(createPasswordDto);
    return {
      message: password
        ? 'Password created successfully'
        : 'Password creation failed',
    };
  }

  @Get()
  async findAll(): Promise<FindPasswordResponse[]> {
    return await this.passwordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindPasswordResponse> {
    return await this.passwordService.findOne({ id, byUserId: true });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<PasswordResponse> {
    const password = await this.passwordService.update({
      id,
      updatePasswordDto,
      byUserId: true,
    });

    return {
      message: password
        ? 'Password updated successfully'
        : 'Password update failed',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PasswordResponse> {
    const password = await this.passwordService.remove({ id, byUserId: true });
    return {
      message: password
        ? 'Password deleted successfully'
        : 'Password deletion failed',
    };
  }
}
