import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    example: 'zuhal@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'zuhal',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'code',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'zuhal code',
  })
  @IsString()
  name: string;
}
