import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInstitutionDto {
  @ApiProperty({ example: 'info@abcu.edu', description: 'The email address of the institution' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the institution' })
  @IsNotEmpty()
  @IsString()
  password: string;
}