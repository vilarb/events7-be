import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventsService } from '../events.service';
import { Type } from '../entities/event.entity';

@Injectable()
export class AdsEventGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Check if the user is authorized to perform operations on ads-type events.
   * Events with type 'ads' are read-only for users that failed the authorization.
   * For other types, the user is authorized to perform all operations.
   *
   * @param context - The execution context
   * @returns True if the user is authorized, false otherwise
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const body = request.body as CreateEventDto | UpdateEventDto;
    const params = request.params;

    // Allow read requests for all users
    if (method === 'GET') {
      return true;
    }

    // Check if the user is authorized to create an ads event
    if (method === 'POST' && body.type === Type.ADS) {
      return await this.checkAdsAuthorization(request);
    }

    // Check if trying to update to ads type or update an existing ads event
    if (method === 'PATCH') {
      const eventId = +params.id;
      const existingEvent = await this.eventsService.findOne(eventId);

      if (existingEvent.type === Type.ADS || body.type === Type.ADS) {
        return await this.checkAdsAuthorization(request);
      }
    }

    // Check if trying to delete an ads event
    if (method === 'DELETE') {
      const eventId = +params.id;
      const existingEvent = await this.eventsService.findOne(eventId);

      if (existingEvent.type === Type.ADS) {
        return await this.checkAdsAuthorization(request);
      }
    }

    return true;
  }

  /**
   * Check if the user is authorized to perform operations on ads-type events.
   * First read ip from request headers, to allow for overrides from the frontend in the development environment.
   *
   * @param request - The request object
   * @returns True if the user is authorized, false otherwise
   */
  private async checkAdsAuthorization(request: Request): Promise<boolean> {
    const ip =
      (request.headers['client-ip'] as string) ||
      (request.headers['x-forwarded-for'] as string) ||
      request?.socket?.remoteAddress;

    if (!ip) {
      throw new ForbiddenException('IP address not found');
    }

    await this.usersService.authorize(ip);

    return true;
  }
}
