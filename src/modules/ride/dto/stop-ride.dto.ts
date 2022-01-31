import { ApiProperty } from '@nestjs/swagger';

export class StopRideDto {
  @ApiProperty()
  rideId: number;
}
