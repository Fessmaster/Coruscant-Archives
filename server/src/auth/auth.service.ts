import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import bcrypt from 'bcrypt'
import { UsersEntity } from "src/users/entity/users.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interface/jwt-payload.interface";


@Injectable()
export class AuthService {
  constructor(    
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  
  async validateUser(username: string, pass: string): Promise<Partial<UsersEntity>> {
    const user = await this.userService.getUser(username);
    if (!user){
      throw new UnauthorizedException('User or password invalid')
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid){
      throw new UnauthorizedException('User or password invalid')
    }

    const {password, ...result} = user

    return result
  }

  async login(user: UsersEntity){
    const payload: JwtPayload = { username: user.login, sub: user.id}   

    return this.jwtService.sign(payload)
  }
}
