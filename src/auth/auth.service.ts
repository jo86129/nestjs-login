import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as Bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService:UserService, private jwtService:JwtService){}
  
  async validatorUser(username: string, password: string){
    const user = await this.userService.FindOneByUsername(username)
    if(user && Bcrypt.compareSync(password, user.password)) {
      user.utime = new Date().toDateString()
      const data = await user.save()
      const { username, ctime, utime, id, name } = data
      return {username, ctime, utime, id, name }
    }
    return null
  }
  
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, name: user.name }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async verify(jwt: string) {
    const user = await this.jwtService.verifyAsync(jwt)
    return user
  }
}
