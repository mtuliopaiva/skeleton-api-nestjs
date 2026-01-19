import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from '../../enums/userType.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: '12345678' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({ enum: UserType, example: UserType.ADMIN })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;
}
