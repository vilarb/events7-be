import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  IpApiResponse,
  AuthApiResponse,
} from './interfaces/api-responses.interface';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Authorizes a user by getting the country code from the IP address and checking if it is allowed
   *
   * @param ip - The IP address to authorize
   * @returns The authorization response
   */
  async authorize(ip: string) {
    const result = await firstValueFrom(
      this.httpService.get<IpApiResponse>(`http://ip-api.com/json/${ip}`),
    );

    const authResponse = await firstValueFrom(
      this.httpService.get<AuthApiResponse>(
        `https://europe-west1-o7tools.cloudfunctions.net/fun7-ad-partner-expertise-test?countryCode=${result.data.countryCode}`,
        {
          auth: {
            username: 'fun7user',
            password: 'fun7pass',
          },
        },
      ),
    );

    return authResponse.data;
  }
}
