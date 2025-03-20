import { ApiProperty } from '@nestjs/swagger';

export class InstitutionResponseDto {
  @ApiProperty({ example: 1, description: 'The ID of the institution' })
  id: number;

  @ApiProperty({ example: 'ABC University', description: 'The name of the institution' })
  institutionName: string;

  @ApiProperty({ example: 'info@abcu.edu', description: 'The email address of the institution' })
  institutionEmail: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the contact person' })
  contactPersonName: string;

  @ApiProperty({ example: '123 Business St, Springfield, IL', description: 'The business address of the institution' })
  businessAddress: string;

  @ApiProperty({ example: 'https://www.abcu.edu', description: 'The website of the institution', required: false })
  institutionWebsite: string;

  @ApiProperty({ example: '123-456-7890', description: 'The phone number of the institution' })
  phoneNumber: string;
}