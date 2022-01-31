import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { AuthModule } from '../../common/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserBase } from '../../base-entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, UserBase]), AuthModule],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
