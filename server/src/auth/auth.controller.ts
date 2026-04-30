import { Controller, Post,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthorizationDto } from './dto/authorization.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Authorize user',     
  })
  @ApiBody({
    type: AuthorizationDto
  })
  @Post('login')
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
