import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/auth-user.decorator';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
@Controller('driver')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiBody({
    type: CreateDriverDto,
    description: 'driver data',
    examples: {
      a: {
        value: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'driver@mail.com',
          phone: '+380991234567',
          middleName: 'Ousman',
          password: 'pass',
        } as CreateDriverDto,
      },
    },
  })
  @ApiOperation({ summary: 'Create driver' })
  async create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      return await this.driverService.create(createDriverDto);
    } catch (error) {
      return error?.message;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  async getAllDrivers() {
    try {
      return await this.driverService.getAllDrivers();
    } catch (error) {
      return error?.message;
    }
  }

  @Post(':id/suspend')
  @ApiResponse({ status: 204, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Suspend driver' })
  async suspendDriver(@Param('id') id: string, @Res() response?: any) {
    try {
      await this.driverService.suspendDriver(+id);
      return response.status(204).send('Driver Suspended Successfully');
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error?.message);
    }
  }
  @Delete(':id/suspend')
  @ApiResponse({ status: 204, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Unsuspend driver' })
  async unSuspendDriver(@Param('id') id: string, @Res() response?: any) {
    try {
      await this.driverService.unSuspendDriver(+id);
      return response.status(204).send('Driver Unsuspended Successfully');
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send(error?.message);
    }
  }
}
