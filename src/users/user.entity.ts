import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ nullable: true }) // Optional field
  employmentStatus: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Optional field
  monthlyIncome: number;

  @Column({ nullable: true }) // Optional field
  idPassportNumber: string;
}