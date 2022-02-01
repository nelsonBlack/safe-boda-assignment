import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PassangerService } from './passanger.service';
import { CreatePassangerDto } from './dto/create-passanger.dto';
import { Passanger } from './entities/passanger.entity';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
@Controller('passanger')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class PassangerController {
  constructor(private readonly passangerService: PassangerService) {}

  @Post()
  @ApiBody({
    type: CreatePassangerDto,
    description: 'driver data',
    examples: {
      a: {
        value: {
          firstName: 'Brown',
          lastName: 'Pink',
          email: 'driver@mail.com',
          phone: '+380741234567',
          middleName: 'Blue',
          password: 'pass',
        } as CreatePassangerDto,
      },
    },
  })
  @ApiOperation({ summary: 'Create passanger' })
  async create(
    @Body() createPassangerDto: CreatePassangerDto,
  ): Promise<Passanger> {
    try {
      return await this.passangerService.create(createPassangerDto);
    } catch (error) {
      return error?.message;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all passangers' })
  async getAllPassangers(): Promise<Passanger[]> {
    try {
      return await this.passangerService.getAllPassangers();
    } catch (error) {
      return error?.message;
    }
  }
}
