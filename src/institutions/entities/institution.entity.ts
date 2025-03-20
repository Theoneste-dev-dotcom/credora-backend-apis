import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institutionName: string;

  @Column({ unique: true })
  registrationLicenseNumber: string;

  @Column()
  contactPersonName: string;

  @Column()
  businessAddress: string;

  @Column({ nullable: true }) // Optional field
  institutionWebsite: string;

  @Column({ unique: true })
  institutionEmail: string;

  @Column({ nullable: false}) 
  password: string;

  @Column()
  phoneNumber: string;
}