import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateSpeakerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nameRu?: string;

  @IsOptional()
  @IsString()
  nameUz?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  photoPosition?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNotEmpty()
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
  @IsNotEmpty()
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
