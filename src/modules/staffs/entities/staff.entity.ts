import { Entity } from 'typeorm';
import { UserBase } from '../../../base-entities/user.entity';
@Entity()
export class Staff extends UserBase {}
