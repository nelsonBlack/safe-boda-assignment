import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRideDto {
  @ApiProperty()
  driverId?: number;
  @ApiProperty()
  passangerId?: number;
  @ApiProperty()
  @IsNumber()
  pickupLat: number;
  @ApiProperty()
  @IsNumber()
  pickupLong: number;
  @ApiProperty()
  @IsNumber()
  destinationLat: number;
  @ApiProperty()
  @IsNumber()
  destinationLong: number;
}
