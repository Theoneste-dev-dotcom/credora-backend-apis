import { IsNotEmpty, IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstitutionDto {
  @ApiProperty({
    example: 'ABC University',
    description: 'The name of the institution',
  })
  @IsNotEmpty()
  @IsString()
  institutionName: string;

  @ApiProperty({
    example: 'REG-123456',
    description: 'The registration license number of the institution',
  })
  @IsNotEmpty()
  @IsString()
  registrationLicenseNumber: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the contact person',
  })
  @IsNotEmpty()
  @IsString()
  contactPersonName: string;

  @ApiProperty({
    example: '123 Business St, Springfield, IL',
    description: 'The business address of the institution',
  })
  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @ApiProperty({
    example: 'https://www.abcu.edu',
    description: 'The website of the institution',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  institutionWebsite: string;

  @ApiProperty({
    example: 'info@abcu.edu',
    description: 'The email address of the institution',
  })
  @IsNotEmpty()
  @IsEmail()
  institutionEmail: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the institution',
  })
  @IsNotEmpty()
  @IsString()
  password:string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'The phone number of the institution',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;


}