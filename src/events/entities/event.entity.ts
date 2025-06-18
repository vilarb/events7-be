import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  type: Type;

  @Column()
  priority: Priority;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
