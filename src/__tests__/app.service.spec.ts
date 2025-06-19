import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return "May the API be with you!"', () => {
      expect(service.getHello()).toBe('May the API be with you!');
    });
  });
});
