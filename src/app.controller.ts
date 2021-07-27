import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor( private readonly authService: AuthService ) {}

  @Get()
  @Render('index')
  async init(@Req() req:Request, @Res() res:Response) {
    const jwt = req.cookies['jwt'] 
    const user = await this.authService.verify(jwt)
    return user
  }

  @Get('login')
  @Render('login')
  loginPage(){
    return {}
  }

  @Get('createUser')
  @Render('createUser')
  createPage(){
    return { }
  }

  
}
