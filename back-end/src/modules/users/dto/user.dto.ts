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
    description: 'ID del usuario (Clave primaria)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'Contraseña del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  password: string;
}
