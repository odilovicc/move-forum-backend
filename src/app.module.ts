import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpeakersModule } from './speakers/speakers.module';
import { FaqModule } from './faq/faq.module';
import { LocalesModule } from './locales/locales.module';
import { Speaker } from './speakers/speaker.entity';
import { FaqItem } from './faq/faq-item.entity';
import { LocaleEntry } from './locales/locale-entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url:
          config.get<string>('DATABASE_URL') ??
          'postgresql://offered_user:1231230@localhost:5432/offered',
        entities: [Speaker, FaqItem, LocaleEntry],
        synchronize: true,
      }),
    }),
    SpeakersModule,
    FaqModule,
    LocalesModule,
  ],
})
export class AppModule {}
