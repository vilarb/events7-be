import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthApiResponse } from './interfaces/api-responses.interface';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('authorize')
  @ApiOperation({ summary: 'Authorize a user' })
  @ApiQuery({ name: 'ip', description: 'User IP address', type: String })
  @ApiResponse({
    status: 200,
    description: 'User authorized successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Not authorized to perform operations on ads-type events',
  })
  authorize(@Query('ip') ip: string): Promise<AuthApiResponse> {
    return this.usersService.authorize(ip);
  }
}
