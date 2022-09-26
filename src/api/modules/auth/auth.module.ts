import {
    Module
} from '@nestjs/common';
import {
    AuthService
} from './auth.service';
import {
    MongooseModule
} from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { jwtConstants } from 'src/api/strategy/constants';
import { UserService } from '../user/user.service';
import { LocalStrategy } from 'src/api/strategy/local.strategy';
import { HashService } from 'src/api/services/hash.service';
import {
    JwtModule
  } from '@nestjs/jwt';
import { AuthController } from './auth.contoller';
  
@Module({
    imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
    }]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
        expiresIn: '1h'
        },
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService],
})
export class AuthModule {}