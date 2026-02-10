import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateFaqDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
