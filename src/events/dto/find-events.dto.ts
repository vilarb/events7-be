import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../entities/event.entity';

export class FindEventsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number;

  @IsOptional()
  @IsString()
  orderBy?: keyof Event;

  @IsOptional()
  @IsString()
  orderDirection?: 'ASC' | 'DESC';

  @IsOptional()
  @IsEnum(Event)
  type?: Event['type'];

  @IsOptional()
  @IsString()
  search?: string;
}
