import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly authService: AuthService
  ) {}
  
  private readonly logger = new Logger(UsersService.name);

  async createNewUser(dto: CreateUserDTO) {
    const { password } = dto;
    const existLogin = await this.usersRepository.findOne({
      where: { login: dto.login },
    });
    const existEmail = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (existLogin) {
      throw new ConflictException('User with this login already exist');
    }
    if (existEmail) {
      throw new ConflictException('User with this email already exist');
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    try {
      await this.usersRepository.save(newUser);
      const { password: _, ...cropUserData } = newUser;
      return this.authService.generateTokens(newUser.id);
    } catch (error) {
      this.logger.error('An error occurred while create new user', error);
    }
  }
}
