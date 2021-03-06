import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SECRET } from '../../configs/secret.config';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
