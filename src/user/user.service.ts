import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findUserbyEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

  async findByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.username= :username', { username })
      .orWhere('users.email= :username', { username })
      .getOne();
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
