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

@ApiTags('private')
@ApiBearerAuth('access-token')
@Controller('private')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBody({description: "send the username to know if the user exists"})
    @Post('username')
    getUserByUsername(@Body() req: User) {
        const username = this.userService.getUserByUsername(req.username).then((user: User) => user.username )
        return username;
    }

}