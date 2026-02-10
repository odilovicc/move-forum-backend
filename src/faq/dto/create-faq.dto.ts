import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
