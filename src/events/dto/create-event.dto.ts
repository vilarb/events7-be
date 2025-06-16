import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Event } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Event)
  type: Event['type'];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Event)
  title: Event['title'];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Event)
  description: Event['description'];

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Event)
  priority: Event['priority'];
}
