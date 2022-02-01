import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRideDto {
  @ApiProperty()
  driverId?: number;
  @ApiProperty()
  passangerId?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pickupLat: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pickupLong: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  destinationLat: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  destinationLong: number;
}
