import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post(':passangerId/:driverId')
  createRide(
    @Body() createRideDto: CreateRideDto,
    @Param('passangerId') passangerId: string,
    @Param('driverId') driverId: string,
  ) {
    createRideDto.passangerId = +passangerId;
    createRideDto.driverId = +driverId;

    return this.rideService.createRide(createRideDto);
  }

  @Post(':rideId/stop')
  stopRide(
    @Body() createRideDto: CreateRideDto,
    @Param('passangerId') passangerId: string,
    @Param('driverId') driverId: string,
  ) {
    createRideDto.passangerId = +passangerId;
    createRideDto.driverId = +driverId;

    return this.rideService.createRide(createRideDto);
  }

  @Get('rides/ongoing')
  getOngoingRides() {
    return this.rideService.getOngoingRides();
  }
}
