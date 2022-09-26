import { Module, ExecutionContext } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HashService } from './services/hash.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LimiterInfo, RateLimiterModule } from 'nest-ratelimiter';
import { RedisService, RedisModule } from 'nestjs-redis';

// This is functions for limiting requests by IP
function getRequestIP(ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();
  return request.ip;
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
  exports: [RedisService]
})
export class AppModule {}
