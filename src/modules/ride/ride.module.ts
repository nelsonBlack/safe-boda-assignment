import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { Passanger } from '../passanger/entities/passanger.entity';
import { Driver } from '../driver/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ride, Driver, Passanger])],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
