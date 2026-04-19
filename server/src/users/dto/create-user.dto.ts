import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserRole } from 'src/common/enums/user-role';

export class CreateUserDTO {
  @ApiProperty({ description: 'User login', example: 'JohnDoe'})
  @IsString()
  @IsNotEmpty() 
  @Length(3, 30)
  login: string;

  @ApiProperty({ description: 'User password', example: 'qwerty123'})
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'The password must have 8 characters, at least one letter and one number',
  })
  password: string;

  @ApiProperty({ description: 'User email address', example: 'johndoe@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User first name', example: 'John'})
  @IsString()
  @Length(2, 30)
  @IsOptional()
  firstName: string;

  @ApiProperty({description: 'User second name', example: 'Doe'})
  @IsString()
  @Length(2, 30)
  @IsOptional()
  secondName: string;
}
