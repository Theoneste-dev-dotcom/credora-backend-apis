import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { Institution } from './entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports:[InstitutionService]
})
export class InstitutionModule {}
