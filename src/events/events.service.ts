import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findAllWithPagination(params: FindManyOptions<Event>): Promise<{
    events: Event[];
    total: number;
  }> {
    const [events, total] = await this.eventRepository.findAndCount(params);
    return { events, total };
  }

  async create(event: CreateEventDto): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async update(id: number, event: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, event);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
