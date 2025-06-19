import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Event, Priority, Type } from '../entities/event.entity';

export class CreateEventDto {
  @ApiProperty({
    description: 'The type of event',
    enum: Type,
    example: Type.APP,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Event['type'];

  @ApiProperty({
    description: 'The title of the event',
    example: 'Team Meeting',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: Event['title'];

  @ApiProperty({
    description: 'The description of the event',
    example: 'Weekly team sync meeting',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: Event['description'];

  @ApiProperty({
    description: 'The priority level of the event',
    enum: Priority,
    example: Priority.P1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;
}
