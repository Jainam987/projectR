import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { Permissions } from 'src/decorators/permissions.decorator';

@Controller('auth')
@UseGuards(PermissionsGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Permissions('can_read')
  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
