import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PassangerService } from './passanger.service';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { UpdatePassangerDto } from './dto/update-passanger.dto';
import { Passanger } from './entities/passanger.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('passanger')
export class PassangerController {
  constructor(private readonly passangerService: PassangerService) {}

  @Post()
  @ApiOperation({ summary: 'Create passanger' })
  async create(
    @Body() createPassangerDto: CreatePassangerDto,
  ): Promise<Passanger> {
    return await this.passangerService.create(createPassangerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all passangers' })
  async findAll(@Body() limit: number) {
    return await this.passangerService.findAll(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one passanger by id' })
  async findOne(@Param('id') id: string) {
    return await this.passangerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update passanger' })
  async update(
    @Param('id') id: string,
    @Body() updatePassangerDto: UpdatePassangerDto,
  ) {
    return await this.passangerService.update(+id, updatePassangerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete passanger' })
  async remove(@Param('id') id: string) {
    return await this.passangerService.delete(+id);
  }
}
