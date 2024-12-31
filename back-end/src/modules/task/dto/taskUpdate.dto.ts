import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class TaskDtoUpdate {
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
    message: 'El título es obligatorio',
  })
  @IsString({
    message: 'El título debe ser una cadena de texto',
  })
  @MinLength(4, {
    message: 'El título debe tener al menos 4 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: 'La descripción es obligatoria',
  })
  @IsString({
    message: 'La descripción debe ser una cadena de texto',
  })
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'El estado es obligatorio',
  })
  @IsString({
    message: 'El estado debe ser una cadena de texto',
  })
  status: 'incomplete' | 'inProgress' | 'complete';

  @IsNotEmpty({
    message: 'La fecha es obligatoria',
  })
  @IsDateString(
    {},
    {
      message: 'La fecha debe ser una fecha válida',
    },
  )
  dateEnd: string;

  @IsNotEmpty({
    message: 'El estilo es obligatorio',
  })
  @IsString({
    message: 'El estilo debe ser una cadena de texto',
  })
  style:
    | 'default'
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'pink';
}
