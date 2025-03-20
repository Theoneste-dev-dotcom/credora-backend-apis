import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dtos/create-institution.dto';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new institution' })
  @ApiBody({ type: CreateInstitutionDto })
  @ApiResponse({
    status: 201,
    description: 'Institution successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createInstitution(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.createInstitution(createInstitutionDto);
  }
}