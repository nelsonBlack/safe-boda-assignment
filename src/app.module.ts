import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import DatabaseConfig from './configs/database.config';
import { DriverModule } from './modules/driver/driver.module';
import { PassangerModule } from './modules/passanger/passanger.module';
import { RideModule } from './modules/ride/ride.module';
import { StaffsModule } from './modules/staffs/staffs.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    DriverModule,
    StaffsModule,
    AuthModule,
    PassangerModule,
    RideModule,
  ],
})
export class AppModule {}
