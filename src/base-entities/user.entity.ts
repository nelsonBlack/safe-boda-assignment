import { IsEmail, MaxLength, MinLength } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
@Entity()
export class UserBase extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  firstName: string;

  @Column('varchar', {
    nullable: true,
    length: 191,
  })
  middleName: string;

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  lastName: string;

  @MinLength(6)
  @MaxLength(15)
  @Column({
    nullable: false,
  })
  phone: string;

  @Column('varchar', {
    nullable: false,
    length: 191,
    unique: true,
  })
  @IsEmail()
  email: string;

  @MinLength(2)
  @Column({
    nullable: false,
    select: false
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column('varchar', {
    nullable: true,
    length: 191,
  })
  rememberToken: string;

  @Column('timestamptz', { nullable: true })
  otpTime: string;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ nullable: true, type: 'timestamp', name: 'deletedAt' })
  deletedAt: string;
}
