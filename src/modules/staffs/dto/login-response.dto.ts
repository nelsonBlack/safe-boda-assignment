import { Staff } from '../entities/staff.entity';

export class LoginResponseDto extends Staff {
  token: string;
}
