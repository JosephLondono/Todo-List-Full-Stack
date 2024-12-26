import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
}
