import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './speaker.entity';
import { SpeakersController } from './speakers.controller';
import { SpeakersService } from './speakers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  controllers: [SpeakersController],
  providers: [SpeakersService],
})
export class SpeakersModule {}
