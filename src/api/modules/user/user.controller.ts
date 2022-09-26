import {
    Body,
    Controller,
    HttpException,
    ExecutionContext,
    HttpStatus,
    Post,
    UseGuards
} from '@nestjs/common';
import {
    AuthGuard
} from '@nestjs/passport';
import {
    UserService 
} from './user.service';
import { ApiTags, ApiBody,ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.schema';

import { RateLimiter } from 'nest-ratelimiter';

// This is functions for limiting requests by IP
function getRequestIP(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
  }

@ApiTags('private')
@ApiBearerAuth('access-token')
@Controller('private')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({description: "send the username to know if the user exists"})
    @Post('username')

    @RateLimiter({
        getId: getRequestIP,
        max: 10,
        duration: 10000,
      })
    getUserByUsername(@Body() req: User) {
        const username = this.userService.getUserByUsername(req.username).then((user: User) => user.username )
        return username;
    }

}