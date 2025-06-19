import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { FindManyOptions, ILike } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FindEventsDto } from './dto/find-events.dto';
import { AdsEventGuard } from './guards/adsEvent.guard';

@Controller('events')
@UseGuards(AdsEventGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateEventDto) {
    return this.eventsService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  async findAll(@Query() params: FindEventsDto): Promise<{
    events: Event[];
    total: number;
  }> {
    // Default values for page and perPage in case they are not provided
    const {
      page = 1,
      perPage = 100,
      search,
      orderBy,
      orderDirection,
      type,
    } = params;
    const skip = (page - 1) * perPage;

    const queryParams: FindManyOptions<Event> = {
      skip,
      take: perPage,
    };

    if (search) {
      queryParams.where = [
        {
          title: ILike(`%${search}%`),
        },
        {
          description: ILike(`%${search}%`),
        },
      ];
    }

    if (orderBy) {
      queryParams.order = { [orderBy]: orderDirection };
    }

    if (type) {
      queryParams.where = {
        type: type,
      };
    }

    return await this.eventsService.findAllWithPagination(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID', type: Number })
  @ApiResponse({ status: 200, description: 'Event found', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'id', description: 'Event ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Event updated successfully',
    type: Event,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
