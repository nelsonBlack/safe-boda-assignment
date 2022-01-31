import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: 'Create driver' })
  async create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    return await this.driverService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get drivers' })
  async findAll(@Body() limit: number): Promise<Driver[]> {
    return await this.driverService.findAll(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create driver' })
  async findOne(@Param('id') id: string): Promise<Driver> {
    return await this.driverService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Create driver' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Post(':id/suspend')
  @ApiOperation({ summary: 'Suspend driver' })
  suspendDriver(@Param('id') id: string) {
    return this.driverService.suspendDriver(+id);
  }
  @Delete(':id/suspend')
  @ApiOperation({ summary: 'Unsuspend driver' })
  unSuspendDriver(@Param('id') id: string) {
    return this.driverService.unSuspendDriver(+id);
  }
}
