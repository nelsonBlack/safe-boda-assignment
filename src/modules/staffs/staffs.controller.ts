import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginStaffDto } from './dto/login-staff.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { Public } from '../../common/decorators/is-public-decorator';
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post('login')
  @ApiBody({
    type: LoginStaffDto,
    description: 'login data',
    examples: {
      a: {
        value: {
          email: 'test@mail.comm',
          password: 'pass',
        } as LoginStaffDto,
      },
    },
  })
  @Public()
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() payload: LoginStaffDto,
  ): Promise<Partial<LoginResponseDto> | undefined> {
    return await this.staffsService.loginStaff(payload);
  }
}
