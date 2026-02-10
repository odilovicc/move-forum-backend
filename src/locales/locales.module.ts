import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleEntry } from './locale-entry.entity';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocaleEntry])],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
