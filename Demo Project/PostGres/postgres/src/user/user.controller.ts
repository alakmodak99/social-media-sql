import { SignInDto } from './dto/signIn.dto';

import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all-user')
  getAllUser() {
    return this.userService.getAllUser();
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getUserProfile(req.user);
  }

  @Post('sign-up')
  addUser(@Body(ValidationPipe) data: SignUpDto) {
    return this.userService.addUser(data);
  }

  @Post('sign-in')
  signInUser(@Body(ValidationPipe) data: SignInDto) {
    return this.userService.logIn(data);
  }
}
