import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginStaffDto } from './dto/login-staff.dto';
import { LoginResponseDto } from './dto/login-response.dto';
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(
    @Body() payload: LoginStaffDto,
  ): Promise<Partial<LoginResponseDto> | undefined> {
    return await this.staffsService.loginStaff(payload);
  }
}
