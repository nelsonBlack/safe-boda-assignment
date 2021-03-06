import { ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

export class InvalidDataException extends HttpException {
  constructor(
    response: string | object,
    status: number = HttpStatus.BAD_REQUEST,
  ) {
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
