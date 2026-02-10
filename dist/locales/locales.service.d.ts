import { Repository } from 'typeorm';
import { LocaleEntry } from './locale-entry.entity';
import { UpdateLocaleValueDto, BulkUpdateLocaleDto } from './dto/update-locale.dto';
export declare class LocalesService {
    private readonly repo;
    constructor(repo: Repository<LocaleEntry>);
    findAll(locale: string): Promise<Record<string, unknown>>;
    findAllLocales(): Promise<Record<string, Record<string, unknown>>>;
    updateValue(dto: UpdateLocaleValueDto): Promise<LocaleEntry>;
    bulkUpdate(dto: BulkUpdateLocaleDto): Promise<Record<string, unknown>>;
    getAvailableLocales(): Promise<string[]>;
    private entriesToNested;
    private setNested;
}
