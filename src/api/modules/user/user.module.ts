import {
    Module
} from '@nestjs/common';
import {
    UserService
} from './user.service';
import {
    UserController
} from './user.controller';
import {
    MongooseModule
} from '@nestjs/mongoose';
import {
    JwtModule
} from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { jwtConstants } from 'src/api/strategy/constants';
import { HashService } from 'src/api/services/hash.service';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from 'src/api/strategy/jwt.strategy';
import { LocalStrategy } from 'src/api/strategy/local.strategy';


@Module({
    imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
    }]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
        expiresIn: '60d'
        },
    }),
    ],
    controllers: [UserController],
    providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {}