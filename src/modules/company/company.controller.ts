import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  CompanyResponse,
  FindAllCompanyResponse,
  DeleteCompanyResponse,
} from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyResponse> {
    const company = await this.companyService.create(createCompanyDto);
    return {
      message: 'Company created successfully',
      data: company,
    };
  }

  @Get()
  async findAll(): Promise<FindAllCompanyResponse> {
    const companies = await this.companyService.findAll();
    return {
      message: 'Companies found successfully',
      data: companies,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyResponse> {
    const company = await this.companyService.findOne(id);
    return {
      message: 'Company found successfully',
      data: company,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyResponse> {
    const company = await this.companyService.update(id, updateCompanyDto);
    return {
      message: 'Company updated successfully',
      data: company,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteCompanyResponse> {
    const result = await this.companyService.remove(id);
    return {
      message: 'Company deleted successfully',
      data: result,
    };
  }
}
