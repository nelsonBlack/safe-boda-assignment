import { Entity, Column, OneToMany } from 'typeorm';
import { UserBase } from '../../../base-entities/user.entity';
import { Ride } from '../../ride/entities/ride.entity';
@Entity()
export class Driver extends UserBase {
  @Column({ type: 'boolean', default: false, nullable: true })
  suspended: boolean;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];
}
