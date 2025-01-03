import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required permissions from the decorator
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // If no permissions are defined, allow access
    }

    const request = context.switchToHttp().getRequest();
    // const user = request.user; // Assume user is added to the request by an authentication middleware

    // if (!user || !user.permissions) {
    //   throw new UnauthorizedException('User permissions are not available.');
    // }

    // // Check if the user has all required permissions
    // const hasPermission = requiredPermissions.every((permission) =>
    //   user.permissions.includes(permission),
    // );

    // if (!hasPermission) {
    //   throw new UnauthorizedException('Permission Denied');
    // }

    return true;
  }
}
