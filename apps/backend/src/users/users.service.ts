import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserProfile } from './types/userProfile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<UserProfile[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      birthDate: user.birthDate,
    }));
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findOne(id: string): Promise<User> {
    const cacheKey = `user_${id}`;
    const cached = await this.cacheManager.get<User>(cacheKey);

    if (cached) return cached;

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.cacheManager.set(cacheKey, user);

    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const userFounded = await this.findOne(id);
    const userSaved = await this.usersRepository.save({
      ...userFounded,
      ...updateUserDto,
    });

    return userSaved;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    const cacheKey = `user_${email}`;
    const cached = await this.cacheManager.get<User>(cacheKey);

    if (cached) return cached;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException(`User with ID ${email} not found`);

    await this.cacheManager.set(cacheKey, user);

    return user;
  }

  async profile(id: string): Promise<UserProfile> {
    const user = await this.findOne(id);
    const userMe = { ...user, password: undefined };
    return userMe;
  }
}
