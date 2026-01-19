import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AuthService {
  private readonly audience = 'users';
  private readonly issuer = 'login';

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private getExpiresInSeconds(): number {
    const raw =
      this.configService.get<string>('JWT_EXPIRES_IN_SECONDS') ?? '604800'; // 7days
    const value = Number(raw);

    if (!Number.isFinite(value) || value <= 0) {
      return 604800;
    }

    return value;
  }

  private createToken(user: Pick<User, 'uuid' | 'email' | 'type'>): string {
    return this.jwtService.sign(
      {
        userId: user.uuid,
        email: user.email,
        type: user.type,
      },
      {
        subject: user.uuid,
        expiresIn: this.getExpiresInSeconds(),
        issuer: this.issuer,
        audience: this.audience,
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      },
    );
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const existing = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' }, deletedAt: null },
      select: { uuid: true },
    });

    if (existing) throw new ConflictException('Email already in use');

    const saltRounds = Number(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS') ?? '10',
    );
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        type: 'user',
      },
      select: {
        uuid: true,
        email: true,
        type: true,
      },
    });

    return { accessToken: this.createToken(user) };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' }, deletedAt: null },
      select: {
        uuid: true,
        email: true,
        type: true,
        passwordHash: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return {
      accessToken: this.createToken({
        uuid: user.uuid,
        email: user.email,
        type: user.type,
      }),
    };
  }

  verifyToken<TPayload extends object>(token: string): TPayload {
    return this.jwtService.verify<TPayload>(token, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      issuer: this.issuer,
      audience: this.audience,
    });
  }
}
