import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstitutionDto } from './dtos/create-institution.dto';
import { Institution } from './entities/institution.entity';

@Injectable()
export class InstitutionService {
    findAllInstitutions() {
        return this.institutionRepository.find();
    }
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {}

  async createInstitution(createInstitutionDto: CreateInstitutionDto) {
    const institution = this.institutionRepository.create(createInstitutionDto);
    return this.institutionRepository.save(institution);
  }

    async findOneByEmail(email: string): Promise<Institution | null> {
      return this.institutionRepository.findOne({ where: { institutionEmail: email } });
    }
}