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

  @Column({ nullable: true })
  driverId: number;

  @Column({
    type: 'point',
    nullable: true,
    transformer: {
      from: (v) => v, // good as-is
      to: (v) => `${v.x},${v.y}`, // { x: 1, y: 2 } -> '1,2'
    },
  })
  public pickup: Point;

  @Column({
    type: 'point',
    nullable: true,
    transformer: {
      from: (v) => v, // good as-is
      to: (v) => `${v.x},${v.y}`, // { x: 1, y: 2 } -> '1,2'
    },
  })
  public destination: Point;

  @Column({
    nullable: true,
    type: 'enum',
    enum: RideStatusEnum,
  })
  rideStatus: RideStatusEnum;

  @ManyToOne(() => Driver, (driver) => driver.rides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @ManyToOne(() => Passanger, (passanger) => passanger.rides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passangerId' })
  passanger: Passanger;
}
