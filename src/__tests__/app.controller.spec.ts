import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should return "May the API be with you!"', () => {
      expect(appController.getHello()).toBe('May the API be with you!');
    });

    it('should call appService.getHello()', () => {
      const getHelloSpy = jest.spyOn(appService, 'getHello');
      appController.getHello();
      expect(getHelloSpy).toHaveBeenCalled();
    });
  });
});
