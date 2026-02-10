import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSpeakerDto {
  @IsString()
  name: string;

  @IsString()
  nameEn: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  position: string;

  @IsString()
  bio: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
