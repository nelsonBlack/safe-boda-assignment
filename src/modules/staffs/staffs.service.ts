import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import * as bcrypt from 'bcrypt';
import { LoginFailException } from '../../common/exceptions/login-fail.exception';
import * as Errors from '../../common/errors/errors-constants';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../../common/auth/auth.service';
import { hashPassword } from '../../common/helpers/hash-password';
const StaffSeed = {
  firstName: 'Damilola',
  middleName: 'John',
  lastName: `peter`,
  email: `test@mail.comm`,
  password: 'pass',
  phone: '08023456789',
} as Staff;
@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly authService: AuthService,
  ) {
    this.saveStaff();
  }

  async saveStaff() {
    const staff = await this.staffRepository.findOne({
      where: { email: StaffSeed.email },
    });
    if (!staff) {
      StaffSeed.password = hashPassword(StaffSeed.password);
      await this.staffRepository.save(StaffSeed);
    }
  }

  async loginStaff(
    loginStaffDto: LoginStaffDto,
  ): Promise<Partial<LoginResponseDto> | undefined> {
    const userFound = await this.staffRepository
      .createQueryBuilder('staff')
      .addSelect('staff.password')
      .where('staff.email = :email', { email: loginStaffDto.email })
      .getOne();

    if (!userFound) {
      throw new LoginFailException(Errors.STAFF_EXCEPTIONS.incorrectLoginData);
    }
    const valid = await bcrypt.compare(
      loginStaffDto.password,
      userFound.password,
    );
    if (!valid) {
      throw new LoginFailException(Errors.STAFF_EXCEPTIONS.userNotFound);
    }
    delete userFound.password;

    return await this.authService.signToken(userFound);
  }
}
