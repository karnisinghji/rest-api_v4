import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: { email: string; password: string;name: string; address: string; mobile_number: string  }) {
    return this.authService.register(body.email, body.password, body.name, body.address, body.mobile_number);
  }

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
