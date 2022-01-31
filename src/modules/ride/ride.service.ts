import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assignObjectToClass } from '../../common/helpers/object-to-class.helper';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { Ride } from './entities/ride.entity';
import { RideStatusEnum } from './enums/ride.enum';
import { Geometry, Point } from 'geojson';
@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    public readonly rideRepository: Repository<Ride>,
  ) {}
  async createRide(createRideDto: CreateRideDto) {
    const isRideOngoing = await this.rideRepository.find({
      where: [
        { rideStatus: RideStatusEnum.Ongoing },
        {
          driverId: createRideDto.driverId,
          passangerId: createRideDto.passangerId,
        },
      ],
    });

    if (isRideOngoing.length > 0) {
      throw new Error('Ride is ongoing');
    }
    let newRide = new Ride();
    newRide = assignObjectToClass(createRideDto, newRide);
    const pickupPoint: Point = {
      type: 'Point',
      coordinates: [createRideDto.pickupLong, createRideDto.pickupLat],
    };
    const dropoffPoint: Point = {
      type: 'Point',
      coordinates: [
        createRideDto.destinationLong,
        createRideDto.destinationLat,
      ],
    };
    newRide.pickup = pickupPoint;
    newRide.destination = dropoffPoint;
    newRide.rideStatus = RideStatusEnum.Ongoing;
    return await this.rideRepository.save(newRide);
  }

  async stopRide(id: number) {
    const toUpdate = await this.rideRepository.findOne(id);
    toUpdate.rideStatus = RideStatusEnum.Done;
    return await this.rideRepository.save(toUpdate);
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
