import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { compare, hash } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  getToken(user: any) {
    const token = jwt.sign(user, 'token', {
      expiresIn: '5m',
    });

    const refreshToken = jwt.sign(
      {
        user,
      },
      'token',
      { expiresIn: '24H' },
    );
    return { token, refreshToken };
  }
  async addUser(data: SignUpDto) {
    try {
      if (data.password != data.confirmPassword)
        throw new HttpException(
          'Passwords are not matching.',
          HttpStatus.BAD_REQUEST,
        );
      const user = await this.userRepo.getUserByField({ email: data.email });
      if (user)
        throw new HttpException(
          'Email already registered',
          HttpStatus.CONFLICT,
        );
      data.password = await hash(data.password, 10);
      await this.userRepo.saveUser(data);
      const tokens = this.getToken({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return { success: true, message: 'Successfully registered', ...tokens };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async logIn(data: SignInDto) {
    const user = await this.userRepo.getUserByField({ email: data.email });
    if (!user)
      throw new HttpException(
        "Your e-mail isn't registered",
        HttpStatus.BAD_REQUEST,
      );
    const isValidUser = await compare(data.password, user.password);
    if (isValidUser) {
      const tokens = this.getToken({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return { success: true, message: 'Successfully logged in', ...tokens };
    }
    throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
  }
  async getAllUser() {
    try {
      return await this.userRepo.getAllUsers();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserProfile(data: any) {
    try {
      return await this.userRepo.getUserByField({ id: data.id });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
