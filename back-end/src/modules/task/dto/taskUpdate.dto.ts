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
    message: 'The id is required',
  })
  @IsNumber(
    {},
    {
      message: 'The id must be a number',
    },
  )
  id: number;
  @IsNotEmpty({
    message: 'The Title is required',
  })
  @IsString({
    message: 'The Title must be a string',
  })
  @MinLength(4, {
    message: 'The Title must be at least 4 characters',
  })
  title: string;

  @IsNotEmpty()
  @IsString({
    message: 'The Description must be a string',
  })
  @MinLength(10, {
    message: 'The Description must be at least 10 characters',
  })
  description: string;

  @IsNotEmpty({
    message: 'The Status is required',
  })
  @IsString({
    message: 'The Status must be a string',
  })
  status: 'incomplete' | 'inprogress' | 'complete';
  @IsNotEmpty({
    message: 'The Date is required',
  })
  @IsDateString(
    {},
    {
      message: 'The Date must be a date',
    },
  )
  dateEnd: string;
}
