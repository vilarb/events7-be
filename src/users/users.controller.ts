import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthApiResponse } from './interfaces/api-responses.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('authorize')
  authorize(@Query('ip') ip: string): Promise<AuthApiResponse> {
    return this.usersService.authorize(ip);
  }
}
