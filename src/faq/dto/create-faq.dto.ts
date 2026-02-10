import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateFaqDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsString()
  questionRu: string;

  @IsString()
  answerRu: string;

  @IsOptional()
  @IsString()
  questionUz?: string;

  @IsOptional()
  @IsString()
  answerUz?: string;

  @IsOptional()
  @IsString()
  questionEn?: string;

  @IsOptional()
  @IsString()
  answerEn?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
