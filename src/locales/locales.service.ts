import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocaleEntry } from './locale-entry.entity';
import {
  UpdateLocaleValueDto,
  BulkUpdateLocaleDto,
} from './dto/update-locale.dto';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocaleEntry)
    private readonly repo: Repository<LocaleEntry>,
  ) {}

  async findAll(locale: string) {
    const entries = await this.repo.find({
      where: { locale },
      order: { key: 'ASC' },
    });
    return this.entriesToNested(entries);
  }

  async findAllLocales() {
    const entries = await this.repo.find({
      order: { locale: 'ASC', key: 'ASC' },
    });

    const result: Record<string, Record<string, unknown>> = {};
    for (const entry of entries) {
      if (!result[entry.locale]) result[entry.locale] = {};
      this.setNested(result[entry.locale]!, entry.key, entry.value);
    }
    return result;
  }

  async updateValue(dto: UpdateLocaleValueDto) {
    const existing = await this.repo.findOneBy({
      locale: dto.locale,
      key: dto.key,
    });

    if (existing) {
      existing.value = dto.value;
      return this.repo.save(existing);
    }

    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async bulkUpdate(dto: BulkUpdateLocaleDto) {
    for (const [key, value] of Object.entries(dto.data)) {
      await this.updateValue({ locale: dto.locale, key, value });
    }
    return this.findAll(dto.locale);
  }

  async getAvailableLocales() {
    const result = await this.repo
      .createQueryBuilder('e')
      .select('DISTINCT e.locale', 'locale')
      .getRawMany();
    return result.map((r: { locale: string }) => r.locale);
  }

  private entriesToNested(
    entries: { key: string; value: string }[],
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const entry of entries) {
      this.setNested(result, entry.key, entry.value);
    }
    return result;
  }

  private setNested(
    obj: Record<string, unknown>,
    path: string,
    value: string,
  ) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]!;
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]!] = value;
  }
}
