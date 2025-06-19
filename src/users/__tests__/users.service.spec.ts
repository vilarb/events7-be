import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authorize', () => {
    it('should authorize user when country is allowed', async () => {
      const mockIpApiResponse = {
        data: { countryCode: 'US' },
      };
      const mockAuthResponse = {
        data: { ads: 'sure, why not!' },
      };

      mockHttpService.get
        .mockReturnValueOnce(of(mockIpApiResponse))
        .mockReturnValueOnce(of(mockAuthResponse));

      const result = await service.authorize('192.168.1.1');

      expect(result).toEqual(mockAuthResponse.data);
      expect(mockHttpService.get).toHaveBeenCalledTimes(2);
    });

    it('should throw ForbiddenException when country is not allowed', async () => {
      const mockIpApiResponse = {
        data: { countryCode: 'XX' },
      };
      const mockAuthResponse = {
        data: { ads: 'not allowed' },
      };

      mockHttpService.get
        .mockReturnValueOnce(of(mockIpApiResponse))
        .mockReturnValueOnce(of(mockAuthResponse));

      await expect(service.authorize('192.168.1.1')).rejects.toThrow(
        'Not authorized to perform operations on ads-type events',
      );
    });

    it('should throw any exception message when request fails', async () => {
      mockHttpService.get.mockImplementation(() => {
        throw new Error('This is a test error');
      });

      await expect(async () => {
        await service.authorize('192.168.1.1');
      }).rejects.toThrow('This is a test error');
    });
  });
});
