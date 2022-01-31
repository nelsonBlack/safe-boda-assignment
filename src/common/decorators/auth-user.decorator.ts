import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import jwt_decode from 'jwt-decode';
import { Staff } from '../../modules/staffs/entities/staff.entity';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): Staff => {
    const token = ctx.switchToHttp().getRequest().headers.authorization;
    return jwt_decode(token);
  },
);
