import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventsController } from '../events.controller';
import { EventsService } from '../events.service';
import { UsersService } from '../../users/users.service';
import { AdsEventGuard } from '../guards/adsEvent.guard';
import { Event } from '../entities/event.entity';

describe('EventsController', () => {
  let controller: EventsController;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockEventRepository = {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        UsersService,
        AdsEventGuard,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: getRepositoryToken(Event),
          useValue: mockEventRepository,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
