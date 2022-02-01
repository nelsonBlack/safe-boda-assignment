import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  middleName: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
