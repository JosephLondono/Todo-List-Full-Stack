import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDeleteDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    description: 'User ID (Primary Key)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'ID is required' })
  id!: number;

  @ApiProperty({
    name: 'username',
    type: String,
    description: 'Username of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'Password of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;
}
