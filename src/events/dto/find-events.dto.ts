import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Event, Type as EventType } from '../entities/event.entity';

export class FindEventsDto {
  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    minimum: 1,
    maximum: 100,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number;

  @ApiProperty({
    description: 'Field to order by',
    required: false,
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  orderBy?: keyof Event;

  @ApiProperty({
    description: 'Order direction',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @IsOptional()
  @IsString()
  orderDirection?: 'ASC' | 'DESC';

  @ApiProperty({
    description: 'Filter by event type',
    required: false,
    enum: EventType,
    example: EventType.APP,
  })
  @IsOptional()
  @IsEnum(EventType)
  type?: EventType;

  @ApiProperty({
    description: 'Search term for title or description',
    required: false,
    example: 'meeting',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
