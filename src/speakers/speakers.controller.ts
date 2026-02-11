import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { diskStorage } from 'multer';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

const speakerUploadsPath = join(process.cwd(), 'uploads', 'speakers');
mkdirSync(speakerUploadsPath, { recursive: true });

function guessExt(originalName?: string, mimeType?: string) {
  const fromName = originalName ? extname(originalName) : '';
  if (fromName) return fromName;

  switch (mimeType) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    default:
      return '';
  }
}

@Controller('speakers')
export class SpeakersController {
  constructor(private readonly speakersService: SpeakersService) {}

  @Get()
  findAll() {
    return this.speakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSpeakerDto) {
    return this.speakersService.create(dto);
  }

  @Put('reorder/batch')
  reorder(@Body() body: { ids: number[] }) {
    return this.speakersService.reorder(body.ids);
  }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: speakerUploadsPath,
        filename: (req, file, cb) => {
          // Keep an extension so nginx serves correct Content-Type.
          // Default multer 'dest' creates extensionless files -> served as application/octet-stream.
          const ext = guessExt(file.originalname, file.mimetype);
          const name = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: { filename: string },
  ) {
    const photoPath = `/uploads/speakers/${file.filename}`;
    return this.speakersService.updatePhoto(id, photoPath);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSpeakerDto) {
    return this.speakersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.remove(id);
  }
}
