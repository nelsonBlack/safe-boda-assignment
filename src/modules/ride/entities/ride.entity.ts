import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { RideStatusEnum } from '../enums/ride.enum';
import { Driver } from '../../driver/entities/driver.entity';
import { Passanger } from '../../passanger/entities/passanger.entity';
@Entity()
export class Ride {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  driverId: number;

  @Column({ nullable: false })
  passangerId: number;

  @Column('decimal', {
    nullable: false,
    precision: 15,
    scale: 2,
  })
  public pickupLat: number;

  @Column('decimal', {
    nullable: false,
    precision: 15,
    scale: 2,
  })
  public pickupLong: number;

  @Column('decimal', {
    nullable: false,
    precision: 15,
    scale: 2,
  })
  public destinationLong: number;

  @Column('decimal', {
    nullable: false,
    precision: 15,
    scale: 2,
  })
  public destinationLat: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: RideStatusEnum,
  })
  rideStatus: RideStatusEnum;

  @ManyToOne(() => Driver, (driver) => driver.rides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driverId', referencedColumnName: 'id' })
  driver: Driver;

  @ManyToOne(() => Passanger, (passanger) => passanger.rides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passangerId', referencedColumnName: 'id' })
  passanger: Passanger;
}
