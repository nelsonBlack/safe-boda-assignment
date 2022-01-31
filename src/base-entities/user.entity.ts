import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  @Column('varchar', {
    nullable: false,
    length: 191,
  })
  @IsEmail()
  email: string;

  @Exclude()
  @Column('varchar', {
    select: false,
    nullable: true,
    length: 128,
  })
  password: string;
  @BeforeUpdate()
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

/*   @CreateDateColumn({ nullable: true, type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ nullable: true, type: 'timestamp', name: 'deletedAt' })
  deletedAt: string; */
}
