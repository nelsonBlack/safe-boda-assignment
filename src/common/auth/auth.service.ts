import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { LoginResponseDto } from '../../modules/staffs/dto/login-response.dto';
import { Staff } from '../../modules/staffs/entities/staff.entity';
//import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  decoded: any = {};
  constructor(private jwtService: JwtService) {}

  async validateUser(token: string): Promise<any> {
    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log(decoded); // bar
      if (decoded) {
        return true;
      }
      this.decoded = decoded;
      if (err) {
        return false;
      }
    });
  }
  signToken(staff: Staff) {
    const response: Partial<LoginResponseDto> = {
      ...staff,
      token: this.jwtService.sign({ staff }),
    };
    return response;
  }
  decodeToken(token) {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      return err;
    }
  }
}
