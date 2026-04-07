import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiProperty()
  @HttpCode(HttpStatus.CREATED)
  createNewUser(@Body() dto: CreateUserDTO){
    return(this.usersService.createNewUser(dto))  
  }
}
