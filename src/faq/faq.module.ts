import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqItem } from './faq-item.entity';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [TypeOrmModule.forFeature([FaqItem])],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
