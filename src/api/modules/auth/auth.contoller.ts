import {
    AuthService
} from './auth.service';
import {
    Controller,
    HttpException,
    HttpStatus,
    UseGuards,
    Post,
    Req
} from '@nestjs/common';
import {
    AuthGuard
} from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RateLimit } from 'nestjs-rate-limiter'

import { Request } from "express";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(AuthGuard('local'))
    @ApiBody({description: "send the user and the password"})
    @Post(`getToken`)
    login(@Req() req: Request) {
        return this.authService.login(req.body);
    }
}