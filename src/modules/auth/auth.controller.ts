import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { PermissionsGuard } from 'src/guards/permission.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { slackHookFunction } from 'src/utils/slackHookFunction';

@Controller('auth')
@UseGuards(PermissionsGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Permissions('can_read')
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    await slackHookFunction('https://hooks.slack.com/services/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', 'Test');
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
