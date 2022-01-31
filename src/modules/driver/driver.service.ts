import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constants } from 'perf_hooks';
import { Repository } from 'typeorm';
import { assignObjectToClass } from '../../common/helpers/object-to-class.helper';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    public readonly driverRepository: Repository<Driver>,
  ) {}
  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const newDriver = new Driver();

    return await this.driverRepository.save(
      assignObjectToClass(createDriverDto, newDriver),
    );
  }

  async findAll(limit: number): Promise<Driver[]> {
    return await this.driverRepository.find({
      take: limit,
    });
  }

  async findOne(id: number): Promise<Driver> {
    return await this.driverRepository.findOne(id);
  }

  update(id: number, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const toUpdate = this.driverRepository.findOne(id);
    return this.driverRepository.save(
      assignObjectToClass(updateDriverDto, toUpdate),
    );
  }

  async suspendDriver(id: number) {
    const toUpdate = await this.driverRepository.findOne(id);
    toUpdate.suspended = true;
    return await this.driverRepository.save(toUpdate);
  }

  async unSuspendDriver(id: number) {
    const toUpdate = await this.driverRepository.findOne(id);
    toUpdate.suspended = false;
    return await this.driverRepository.save(toUpdate);
  }
}
