import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateSpeakerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nameRu?: string;

  @IsOptional()
  @IsString()
  nameUz?: string;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  positionRu?: string;

  @IsOptional()
  @IsString()
  positionUz?: string;

  @IsOptional()
  @IsString()
  positionEn?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  bioRu?: string;

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
