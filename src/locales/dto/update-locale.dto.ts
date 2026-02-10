import { IsString, IsObject, IsOptional } from 'class-validator';

export class UpdateLocaleEntryDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class BulkUpdateLocaleDto {
  @IsString()
  locale: string;

  @IsObject()
  data: Record<string, string>;
}

export class UpdateLocaleValueDto {
  @IsString()
  locale: string;

  @IsString()
  key: string;

  @IsString()
  value: string;
}
