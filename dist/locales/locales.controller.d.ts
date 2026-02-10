import { LocalesService } from './locales.service';
import { UpdateLocaleValueDto, BulkUpdateLocaleDto } from './dto/update-locale.dto';
export declare class LocalesController {
    private readonly localesService;
    constructor(localesService: LocalesService);
    findAllLocales(): Promise<Record<string, Record<string, unknown>>>;
    getAvailableLocales(): Promise<string[]>;
    findAll(locale: string): Promise<Record<string, unknown>>;
    updateValue(dto: UpdateLocaleValueDto): Promise<import("./locale-entry.entity").LocaleEntry>;
    bulkUpdate(dto: BulkUpdateLocaleDto): Promise<Record<string, unknown>>;
}
