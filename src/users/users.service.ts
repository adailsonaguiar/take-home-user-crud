import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    console.log('userrrrr:::', id);
    const user = await this.findOne(id);
    await this.usersRepository.save({ ...user, ...updateUserDto });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
