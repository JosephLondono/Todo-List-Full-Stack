import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class TaskDtoUpdateStatus {
  @IsNotEmpty({
    message: 'El id es obligatorio',
  })
  @IsNumber(
    {},
    {
      message: 'El id debe ser un número',
    },
  )
  id: number;

  @IsNotEmpty({
    message: 'El estado es obligatorio',
  })
  @IsString({
    message: 'El estado debe ser un string',
  })
  @MinLength(3, {
    message: 'El estado debe tener al menos 3 caracteres',
  })
  status: 'incomplete' | 'inProgress' | 'complete';
}
