import { Injectable } from '@nestjs/common';
import { CreateMortoBikeDto } from './dto/create-morto-bike.dto';
import { UpdateMortoBikeDto } from './dto/update-morto-bike.dto';

@Injectable()
export class MortoBikesService {
  create(createMortoBikeDto: CreateMortoBikeDto) {
    return 'This action adds a new mortoBike';
  }

  findAll() {
    return `This action returns all mortoBikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mortoBike`;
  }

  update(id: number, updateMortoBikeDto: UpdateMortoBikeDto) {
    return `This action updates a #${id} mortoBike`;
  }

  remove(id: number) {
    return `This action removes a #${id} mortoBike`;
  }
}
