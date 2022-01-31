import { Entity, Column, OneToMany } from 'typeorm';
import { UserBase } from '../../../base-entities/user.entity';
import { Ride } from '../../ride/entities/ride.entity';
@Entity()
export class Passanger extends UserBase {
  @OneToMany(() => Ride, (ride) => ride.passanger)
  rides: Ride[];
}
