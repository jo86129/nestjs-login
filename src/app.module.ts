import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './login.middleware';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),
  RouterModule.register([
    {
      path: '/api',
      module: UserModule
    }
  ]),UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: '', method: RequestMethod.GET }
      );
  }
}
