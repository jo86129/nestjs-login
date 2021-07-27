import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchemas } from './user.model';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchemas }]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions:{ expiresIn: '1d' }
  })],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
