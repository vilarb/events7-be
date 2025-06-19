import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Priority {
  P1 = 1,
  P2 = 2,
  P3 = 3,
  P4 = 4,
  P5 = 5,
  P6 = 6,
  P7 = 7,
  P8 = 8,
  P9 = 9,
  P10 = 10,
}

export enum Type {
  CROSSPROMO = 'crosspromo',
  LIVEOPS = 'liveops',
  APP = 'app',
  ADS = 'ads',
}

@Entity()
export class Event {
  @ApiProperty({ description: 'The unique identifier of the event' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the event' })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ description: 'The description of the event' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'The type of event', enum: Type })
  @Column()
  type: Type;

  @ApiProperty({
    description: 'The priority level of the event',
    enum: Priority,
  })
  @Column()
  priority: Priority;

  @ApiProperty({ description: 'When the event was created' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'When the event was last updated' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
