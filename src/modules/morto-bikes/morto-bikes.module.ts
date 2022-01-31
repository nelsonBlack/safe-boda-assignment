import { Module } from '@nestjs/common';
import { MortoBikesService } from './morto-bikes.service';
import { MortoBikesController } from './morto-bikes.controller';

@Module({
  controllers: [MortoBikesController],
  providers: [MortoBikesService]
})
export class MortoBikesModule {}
