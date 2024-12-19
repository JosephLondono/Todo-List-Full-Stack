import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    description: 'User ID (Primary Key)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'Password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(4, { message: 'Password must be at least 4 characters' })
  password: string;
}
