import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
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
}