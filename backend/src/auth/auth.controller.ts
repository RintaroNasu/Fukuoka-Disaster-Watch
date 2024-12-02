import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('email:', email);
    return await this.authService.signUp(email, password);
  }

  @Post('/signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('email:', email);
    return await this.authService.signIn(email, password);
  }
}
