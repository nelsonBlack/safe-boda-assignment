import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { UserBase } from '../../base-entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, UserBase])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
