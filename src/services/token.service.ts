import { UserEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateJwtToken(user: UserEntity, expiresIn = '24h') {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
