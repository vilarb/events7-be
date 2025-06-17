import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { CreateEventDto } from '../dto/create-event.dto';

@Injectable()
export class CreateEventGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Checks if the user is authorized to access the resource
   *
   * @param context - The execution context
   * @returns True if the user is authorized, false otherwise
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body as CreateEventDto;

    // Check the request body for the ads type
    const adsType = body.type;
    if (adsType !== 'ads') {
      return true;
    }

    const ip =
      (request.headers['client-ip'] as string) ||
      (request.headers['x-forwarded-for'] as string) ||
      request?.socket?.remoteAddress;

    if (!ip) {
      return false;
    }

    const authResponse = await this.usersService.authorize(ip);

    return authResponse.ads === 'sure, why not!';
  }
}
