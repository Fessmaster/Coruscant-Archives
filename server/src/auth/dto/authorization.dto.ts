import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthorizationDto {
  @ApiProperty({ description: 'User login', example: 'JohnDoe'})
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @ApiProperty({ description: 'User password', example: 'qwerty123'})
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'The password must have 8 characters, at least one letter and one number',
  })
  password: string;

}
