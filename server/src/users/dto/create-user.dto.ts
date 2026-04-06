import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { UserRole } from 'src/common/enums/user-role';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  login: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'The password must have 8 characters, at least one letter and one number',
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty()
  @IsString()
  @Length(2, 30)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(2, 30)
  @IsOptional()
  secondName: string;
}
