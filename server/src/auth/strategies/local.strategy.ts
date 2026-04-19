import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UsersEntity } from "src/users/entity/users.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor (private authService: AuthService){
    super();
  }

  async validate(username: string, password: string): Promise<Partial<UsersEntity>> {
    const user = await this.authService.validateUser(username, password);      
   
    if (!user){
      throw new UnauthorizedException();
    }
    return user
  }
}