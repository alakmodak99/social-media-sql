/* eslint-disable prettier/prettier */
import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepository) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  async verify(token: string) {
    try {
      return jwt.verify(token, 'token');
    } catch (err) {
      return false;
    }
  }
  async validateRequest(data) {
    const accessToken = data?.headers.authorization.replace('Bearer ', '');
    const verify: any = await this.verify(accessToken);
    if (!verify) return false;
    const user: any = verify?.user;
    if (!user?.email) return false;
    const isValidUser = await this.userRepo.getUserByField({
      email: user?.email,
    });
    if (!isValidUser?.id) return false;
    data.user = { ...isValidUser };
    return true;
  }
}
