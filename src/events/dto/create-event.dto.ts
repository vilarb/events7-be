import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';
import { Event, Priority, Type } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Event['type'];

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: Event['title'];

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: Event['description'];

  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;
}
