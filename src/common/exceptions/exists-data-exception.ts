import { ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

export class ExistsException extends HttpException {
  constructor(response: string | object, status: number = HttpStatus.CONFLICT) {
    super(response, status);
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(status).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
