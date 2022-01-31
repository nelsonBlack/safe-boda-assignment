import { PartialType } from '@nestjs/swagger';
import { CreateMortoBikeDto } from './create-morto-bike.dto';

export class UpdateMortoBikeDto extends PartialType(CreateMortoBikeDto) {}
