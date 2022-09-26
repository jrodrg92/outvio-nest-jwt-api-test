import { Controller, ExecutionContext, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("hashByPasswd?")
  getHello(@Query('passwd') passwd: string): Promise<string> {
    return this.appService.getHashOfPasswd(passwd);
  }

}