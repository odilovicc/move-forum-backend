import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSpeakerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  nameRu: string;

  @IsOptional()
  @IsString()
  nameUz?: string;

  @IsString()
  nameEn: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsString()
  positionRu: string;

  @IsOptional()
  @IsString()
  positionUz?: string;

  @IsOptional()
  @IsString()
  positionEn?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsString()
  bioRu: string;

  @IsOptional()
  @IsString()
  bioUz?: string;

  @IsOptional()
  @IsString()
  bioEn?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
