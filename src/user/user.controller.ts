import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.model';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService, 
    private readonly authService: AuthService
  ) {}

  @Get()
  async GetUser() {
    return this.userService.GetUser()
  }

  @Get(':id')
  async GetOneUser(@Param('id') id: string){
    return this.userService.GetOneUser(id)
  }

  @Post()
  async PostUser(@Body() user: UserDto, @Res() res:Response) {
    const { username, password, name } = user
    this.userService.PostUser(username, password, name)
    res.redirect('/login')
  }

  @Put(':id')
  async PutUser(@Param('id') id: string, @Body() user: UserDto) {
    const { password, name } = user
    return this.userService.PutUser(id, password, name)
  }
  @Delete(':id')
  async DelUser(@Param('id') id: string) {
    return this.userService.DelUser(id)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    const jwt = await this.authService.login(req.user)
    res.cookie('jwt', jwt.access_token, { httpOnly: true })
    return 'success'
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt')
    res.redirect('/login')
  }
}
