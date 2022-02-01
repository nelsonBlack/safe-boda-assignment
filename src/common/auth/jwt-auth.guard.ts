import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SECRET } from '../../configs/secret.config';
import { IS_PUBLIC_KEY } from '../decorators/is-public-decorator';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    } else {
      let token = context.switchToHttp().getRequest()?.headers?.authorization;
      if (!token) throw Error('Token not found in headers');
      (token = jwt.verify(
        token.split(' ')[1],
        SECRET,
        (err: any, decoded: any) => {
          console.log(decoded);
          if (decoded) {
            return true;
          } else {
            return false;
          }
        },
      )),
        (_err: any) => {
          return false;
        };
      return token;
    }
  }
  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
