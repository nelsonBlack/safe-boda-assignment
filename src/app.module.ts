import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import DatabaseConfig from './configs/database.config';
import { ChargesModule } from './modules/charges/charges.module';
import { DriverModule } from './modules/driver/driver.module';
import { MortoBikesModule } from './modules/morto-bikes/morto-bikes.module';
import { StaffsModule } from './modules/staffs/staffs.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    //ChargesModule,
    //  MortoBikesModule,
    // RidersModule,
    DriverModule,
    StaffsModule,
    AuthModule,
  //  RideModule,
    /*  DriverModule,
    PassangerModule, */
    // TripsModule,
  ],
})
export class AppModule {}
