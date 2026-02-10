import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

const speakerUploadsPath = join(process.cwd(), 'uploads', 'speakers');
mkdirSync(speakerUploadsPath, { recursive: true });

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
      dest: speakerUploadsPath,
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpeakerDto,
  ) {
    return this.speakersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.remove(id);
  }
}
