import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocaleEntry } from './locale-entry.entity';
import {
  UpdateLocaleValueDto,
  BulkUpdateLocaleDto,
} from './dto/update-locale.dto';

type DefaultLocaleEntry = { locale: string; key: string; value: string };

const DEFAULT_LOCALE_ENTRIES: DefaultLocaleEntry[] = [
  {
    locale: 'ru',
    key: 'booking.consent',
    value: 'Я даю согласие на обработку данных',
  },
  {
    locale: 'uz',
    key: 'booking.consent',
    value: "Shaxsiy ma'lumotlarni qayta ishlashga roziman",
  },
  {
    locale: 'en',
    key: 'booking.consent',
    value: 'I consent to the processing of personal data',
  },
  {
    locale: 'ru',
    key: 'seo.site_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'uz',
    key: 'seo.site_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'en',
    key: 'seo.site_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'ru',
    key: 'seo.yandex_metrica_id',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.yandex_metrica_id',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.yandex_metrica_id',
    value: '',
  },
  {
    locale: 'ru',
    key: 'seo.title',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'uz',
    key: 'seo.title',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'en',
    key: 'seo.title',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'ru',
    key: 'seo.description',
    value:
      'Международный форум о публичных и корпоративных закупках в Узбекистане. Программа, спикеры, билеты и регистрация.',
  },
  {
    locale: 'uz',
    key: 'seo.description',
    value:
      "O‘zbekistondagi davlat va korporativ xaridlar bo‘yicha xalqaro forum. Dastur, spikerlar, chiptalar va ro‘yxatdan o‘tish.",
  },
  {
    locale: 'en',
    key: 'seo.description',
    value:
      'International forum on public and corporate procurement in Uzbekistan. Program, speakers, tickets, and registration.',
  },
  {
    locale: 'ru',
    key: 'seo.keywords',
    value:
      'форум, закупки, публичные закупки, корпоративные закупки, Узбекистан, procurement, conference, tickets',
  },
  {
    locale: 'uz',
    key: 'seo.keywords',
    value:
      "forum, xaridlar, davlat xaridlari, korporativ xaridlar, O‘zbekiston, procurement, conference, tickets",
  },
  {
    locale: 'en',
    key: 'seo.keywords',
    value:
      'forum, procurement, public procurement, corporate procurement, Uzbekistan, conference, tickets',
  },
  {
    locale: 'ru',
    key: 'seo.og_image',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.og_image',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.og_image',
    value: '',
  },
  {
    locale: 'ru',
    key: 'seo.org_name',
    value: 'AUPP',
  },
  {
    locale: 'uz',
    key: 'seo.org_name',
    value: 'AUPP',
  },
  {
    locale: 'en',
    key: 'seo.org_name',
    value: 'AUPP',
  },
  {
    locale: 'ru',
    key: 'seo.org_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'uz',
    key: 'seo.org_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'en',
    key: 'seo.org_url',
    value: 'https://procureforum.uz',
  },
  {
    locale: 'ru',
    key: 'seo.event_name',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'uz',
    key: 'seo.event_name',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'en',
    key: 'seo.event_name',
    value: 'Public & Corporate Procurement Forum Uzbekistan — 2026',
  },
  {
    locale: 'ru',
    key: 'seo.event_description',
    value:
      'Международный форум о публичных и корпоративных закупках в Узбекистане.',
  },
  {
    locale: 'uz',
    key: 'seo.event_description',
    value:
      "O‘zbekistondagi davlat va korporativ xaridlar bo‘yicha xalqaro forum.",
  },
  {
    locale: 'en',
    key: 'seo.event_description',
    value:
      'International forum on public and corporate procurement in Uzbekistan.',
  },
  {
    locale: 'ru',
    key: 'seo.event_start_date',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.event_start_date',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.event_start_date',
    value: '',
  },
  {
    locale: 'ru',
    key: 'seo.event_end_date',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.event_end_date',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.event_end_date',
    value: '',
  },
  {
    locale: 'ru',
    key: 'seo.event_location_name',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.event_location_name',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.event_location_name',
    value: '',
  },
  {
    locale: 'ru',
    key: 'seo.event_location_address',
    value: '',
  },
  {
    locale: 'uz',
    key: 'seo.event_location_address',
    value: '',
  },
  {
    locale: 'en',
    key: 'seo.event_location_address',
    value: '',
  },
  {
    locale: 'ru',
    key: 'branding.buy_ticket_url',
    value: '',
  },
  {
    locale: 'uz',
    key: 'branding.buy_ticket_url',
    value: '',
  },
  {
    locale: 'en',
    key: 'branding.buy_ticket_url',
    value: '',
  },
];

@Injectable()
export class LocalesService implements OnModuleInit {
  constructor(
    @InjectRepository(LocaleEntry)
    private readonly repo: Repository<LocaleEntry>,
  ) {}

  async onModuleInit() {
    await this.ensureDefaults();
  }

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

  private async ensureDefaults() {
    for (const entry of DEFAULT_LOCALE_ENTRIES) {
      const existing = await this.repo.findOneBy({
        locale: entry.locale,
        key: entry.key,
      });
      if (!existing) {
        await this.repo.save(this.repo.create(entry));
      }
    }
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
