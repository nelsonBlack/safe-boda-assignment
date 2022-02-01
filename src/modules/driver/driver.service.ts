import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_EXCEPTIONS } from '../../common/errors/errors-constants';
import { ExistsException } from '../../common/exceptions/exists-data-exception';
import { InvalidDataException } from '../../common/exceptions/invalid-data-exception';
import { hashPassword } from '../../common/helpers/hash-password';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    public readonly driverRepository: Repository<Driver>,
  ) {}
  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const phoneExists = await this.driverRepository.count({
      phone: createDriverDto.phone,
    });
    const emailExists = await this.driverRepository.count({
      phone: createDriverDto.phone,
    });
    if (phoneExists >= 1)
      throw new ExistsException(USER_EXCEPTIONS.existsPhone);
    if (emailExists >= 1)
      throw new ExistsException(USER_EXCEPTIONS.existsEmail);
    try {
      const newDriver: Driver = {
        ...createDriverDto,
      } as Driver;
      newDriver.password = hashPassword(newDriver.password);
      return await this.driverRepository.save(newDriver);
    } catch (error) {
      throw new InvalidDataException(error.detail);
    }
  }

  async getAllDrivers(): Promise<Driver[]> {
    const drivers = await this.driverRepository.find();
    return drivers;
  }

  async suspendDriver(id: number) {
    const toUpdate = await this.driverRepository.findOne(id);
    if (!toUpdate) throw new InvalidDataException(USER_EXCEPTIONS.userNotFound);
    toUpdate.suspended = true;
    return await this.driverRepository.save(toUpdate);
  }

  async unSuspendDriver(id: number) {
    const toUpdate = await this.driverRepository.findOne(id);
    if (!toUpdate) throw new InvalidDataException(USER_EXCEPTIONS.userNotFound);
    toUpdate.suspended = false;
    return await this.driverRepository.save(toUpdate);
  }
}
