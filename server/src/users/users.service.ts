import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  private readonly logger = new Logger(UsersService.name)
  async createNewUser(dto: CreateUserDTO) {
    const { password } = dto;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = this.usersRepository.create({...dto, password: hashedPassword})
    try {
      await this.usersRepository.save(newUser)
      const {password: _, ...cropUserData} = newUser
      return cropUserData
    } catch (error) {
      this.logger.error('An error occurred while create new user')
    }
  }
}
