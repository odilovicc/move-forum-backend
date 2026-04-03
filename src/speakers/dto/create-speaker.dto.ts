import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSpeakerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @IsOptional()
  @IsString()
  nameUz?: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  photoPosition?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
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
