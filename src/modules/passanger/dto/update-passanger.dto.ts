import { PartialType } from '@nestjs/swagger';
import { CreatePassangerDto } from './create-passanger.dto';

export class UpdatePassangerDto extends PartialType(CreatePassangerDto) {}
