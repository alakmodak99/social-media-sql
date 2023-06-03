import { Injectable } from '@nestjs/common';
import { SignUpDto } from './../dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async saveUser(data: SignUpDto) {
    const { email, name, password } = data;
    return await this.repository.save({
      name,
      email,
      password,
    });
  }
  async getAllUsers(): Promise<any> {
    return await this.repository.find({
      relations: ['posts', 'likes.post', 'comments.post'],
    });
  }
  async getUserByField(field: object): Promise<any> {
    return await this.repository.findOneBy(field);
  }
  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
  async updateUserPassword(password: any, id: string) {
    return this.repository.update({ id }, { password: password });
  }
}
