import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './entities/ride.entity';
import { RideStatusEnum } from './enums/ride.enum';
import { Point } from 'geojson';
import { Driver } from '../driver/entities/driver.entity';
import { Passanger } from '../passanger/entities/passanger.entity';
import { ExistsException } from '../../common/exceptions/exists-data-exception';
import {
  RIDE_EXCEPTIONS,
  USER_EXCEPTIONS,
} from '../../common/errors/errors-constants';
@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    public readonly rideRepository: Repository<Ride>,
    @InjectRepository(Driver)
    public readonly driverRepository: Repository<Driver>,
    @InjectRepository(Passanger)
    public readonly passangerRepository: Repository<Passanger>,
  ) {}
  async createRide(createRideDto: CreateRideDto) {
    const driverExists = await this.driverRepository.count({
      id: createRideDto.driverId,
    });
    if (!driverExists) return new ExistsException(USER_EXCEPTIONS.userNotFound);
    const passangerExists = await this.passangerRepository.count({
      id: createRideDto.passangerId,
    });
    if (!passangerExists)
      return new ExistsException(USER_EXCEPTIONS.userNotFound);
    const isRideOngoing = await this.rideRepository
      .createQueryBuilder('ride')
      .leftJoinAndSelect('ride.driver', 'driver')
      .leftJoinAndSelect('ride.passanger', 'passanger')
      .where('ride.rideStatus = :rideStatus', {
        rideStatus: RideStatusEnum.Ongoing,
      })
      .andWhere('ride.driverId = :driverId', {
        driverId: createRideDto.driverId,
      })
      .orWhere('ride.passangerId = :passangerId', {
        passangerId: createRideDto.passangerId,
      })
      .getCount();

    if (isRideOngoing) {
      return new ExistsException('Passanger or driver has ongoing ride');
    }
    const newRide: Ride = {
      ...createRideDto,
      rideStatus: RideStatusEnum.Ongoing,
    } as Ride;

    return await this.rideRepository.save(newRide);
  }

  async stopRide(id: number) {
    const onGoingRides = await this.getOngoingRides();
    const toUpdateRide = onGoingRides.find((ride) => {
      return ride.id === id;
    });
    if (!toUpdateRide) return new ExistsException(RIDE_EXCEPTIONS.noOnGongRide);
    toUpdateRide.rideStatus = RideStatusEnum.Done;
    return await this.rideRepository.save(toUpdateRide);
  }

  async getOngoingRides() {
    const onGoingRides = await this.rideRepository.find({
      where: {
        rideStatus: RideStatusEnum.Ongoing,
      },
    });
    return onGoingRides;
  }
}
