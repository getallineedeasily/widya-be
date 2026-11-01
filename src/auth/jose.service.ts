import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

@Injectable()
export class JoseService {
  constructor(private readonly configService: ConfigService) {}

  async createAccessToken(id: number): Promise<string> {
    const secret = new TextEncoder().encode(
      this.configService.get('JWT_SECRET_KEY'),
    );

    return await new jose.SignJWT({ id })
      .setProtectedHeader({ alg: this.configService.get('JWT_ALGORITHM')! })
      .setIssuedAt()
      .setIssuer(this.configService.get('JWT_ISSUER')!)
      .setExpirationTime(this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN')!)
      .sign(secret);
  }

  async verifyAccessToken(token: string) {
    const secret = new TextEncoder().encode(
      this.configService.get('JWT_SECRET_KEY'),
    );

    try {
      const { payload } = await jose.jwtVerify(token, secret, {
        issuer: this.configService.get('JWT_ISSUER'),
      });
      return { isValid: true, data: payload as { id: number } };
    } catch (_) {
      return { isValid: false, data: null };
    }
  }
}
