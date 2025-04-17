import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Find a user by id.
   *
   * @throws {NotFoundException} if user with given id not found
   * @param {string} id - user id
   * @returns {Promise<User>} user
   */
  /*******  3ead53d8-adb6-4d94-9b45-b969ba035e3b  *******/
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

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
}
