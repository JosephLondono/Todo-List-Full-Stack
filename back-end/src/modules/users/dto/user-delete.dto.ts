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
    description: 'ID del usuario (Clave primaria)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id!: number;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email del usuario',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
