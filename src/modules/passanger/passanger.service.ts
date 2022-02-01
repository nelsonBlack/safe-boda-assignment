import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_EXCEPTIONS } from '../../common/errors/errors-constants';
import { ExistsException } from '../../common/exceptions/exists-data-exception';
import { hashPassword } from '../../common/helpers/hash-password';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { Passanger } from './entities/passanger.entity';

@Injectable()
export class PassangerService {
  constructor(
    @InjectRepository(Passanger)
    public readonly passangerRepository: Repository<Passanger>,
  ) {}
  async create(createPassangerDto: CreatePassangerDto): Promise<Passanger> {
    const phoneExists = await this.passangerRepository.count({
      phone: createPassangerDto.phone,
    });
    const emailExists = await this.passangerRepository.count({
      phone: createPassangerDto.phone,
    });
    if (phoneExists >= 1)
      throw new ExistsException(USER_EXCEPTIONS.existsPhone);
    if (emailExists >= 1)
      throw new ExistsException(USER_EXCEPTIONS.existsEmail);
    const newPassanger: Passanger = {
      ...createPassangerDto,
    } as Passanger;
    newPassanger.password = hashPassword(newPassanger.password);
    return await this.passangerRepository.save(newPassanger);
  }

  async getAllPassangers(): Promise<Passanger[]> {
    return await this.passangerRepository.find();
  }
}
