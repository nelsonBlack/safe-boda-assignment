import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';

@Controller('ride')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post(':passangerId/:driverId')
  @ApiOperation({ summary: 'Create ride' })
  @ApiBody({
    type: CreateRideDto,
    description: 'driver data',
    examples: {
      a: {
        value: {
          pickupLat: -1.286389,
          pickupLong: 36.817223,
          destinationLat: -1.386389,
          destinationLong: 36.117223,
        } as CreateRideDto,
      },
    },
  })
  async createRide(
    @Body() createRideDto: CreateRideDto,
    @Param('passangerId') passangerId: string,
    @Param('driverId') driverId: string,
  ) {
    try {
      createRideDto.passangerId = +passangerId;
      createRideDto.driverId = +driverId;
      return await this.rideService.createRide(createRideDto);
    } catch (error) {
      return error?.message;
    }
  }

  @Post('ride/:rideId/stop')
  @ApiOperation({ summary: 'stop ride' })
  async stopRide(@Param('rideId') rideId: string) {
    try {
      return await this.rideService.stopRide(+rideId);
    } catch (error) {
      return error?.message;
    }
  }

  @Get('rides/ongoing')
  @ApiOperation({ summary: 'Get all ongoing rides' })
  async getOngoingRides() {
    return await this.rideService.getOngoingRides();
  }
}
