import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../../core/database/prisma.service';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: RegisterCommand) {
    const { email, password } = command.dto;

    const existing = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });

    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);

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
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
