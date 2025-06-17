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
import { EventsService } from './events.service';
import { FindManyOptions, ILike } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FindEventsDto } from './dto/find-events.dto';
import { AuthGuard } from './events.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateEventDto) {
    return this.eventsService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() params: FindEventsDto): Promise<{
    events: Event[];
    total: number;
  }> {
    // Default values for page and perPage in case they are not provided
    const { page = 1, perPage = 100, search, orderBy, orderDirection } = params;
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

    return await this.eventsService.findAllWithPagination(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
