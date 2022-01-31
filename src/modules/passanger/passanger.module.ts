import { Module } from '@nestjs/common';
import { PassangerService } from './passanger.service';
import { PassangerController } from './passanger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBase } from '../../base-entities/user.entity';
import { Passanger } from './entities/passanger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passanger, UserBase])],
  controllers: [PassangerController],
  providers: [PassangerService],
})
export class PassangerModule {}
