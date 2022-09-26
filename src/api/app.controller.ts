import { Controller, ExecutionContext, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

import { RateLimiter } from 'nest-ratelimiter';

// Let's define several functions that returns the identifier
// to limit against.

// This is functions for limiting requests by IP
function getRequestIP(ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();
  return request.ip;
}

@Controller()
@RateLimiter({ getId: getRequestIP })
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("hashByPasswd?")
  getHello(@Query('passwd') passwd: string): Promise<string> {
    return this.appService.getHashOfPasswd(passwd);
  }

}