import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user (minimum 6 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'The phone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '123 Main St, Springfield, IL',
    description: 'The address of the user',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Employed',
    description: 'The employment status of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  employmentStatus: string;

  @ApiProperty({
    example: 5000.0,
    description: 'The monthly income of the user',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  monthlyIncome: number;

  @ApiProperty({
    example: 'A1234567',
    description: 'The ID or passport number of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  idPassportNumber: string;
}