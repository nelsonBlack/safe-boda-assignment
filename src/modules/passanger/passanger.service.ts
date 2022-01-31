import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assignObjectToClass } from '../../common/helpers/object-to-class.helper';
import { Driver } from '../driver/entities/driver.entity';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { UpdatePassangerDto } from './dto/update-passanger.dto';
import { Passanger } from './entities/passanger.entity';

@Injectable()
export class PassangerService {
  constructor(
    @InjectRepository(Passanger)
    public readonly passangerRepository: Repository<Passanger>,
  ) {}
  async create(createPassangerDto: CreatePassangerDto): Promise<Passanger> {
    const newPassanger = new Passanger();

    return await this.passangerRepository.save(
      assignObjectToClass(createPassangerDto, newPassanger),
    );
  }

  async findAll(limit: number): Promise<Passanger[]> {
    return await this.passangerRepository.find({
      take: limit,
    });
  }

  async findOne(id: number): Promise<Passanger> {
    return await this.passangerRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.passangerRepository.delete(id);
  }

  async update(
    id: number,
    updatePassangerDto: UpdatePassangerDto,
  ): Promise<Driver> {
    const toUpdate = await this.passangerRepository.findOne(id);
    return this.passangerRepository.save(
      assignObjectToClass(updatePassangerDto, toUpdate),
    );
  }
}
