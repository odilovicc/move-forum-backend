import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { UpdateLocaleValueDto, BulkUpdateLocaleDto } from './dto/update-locale.dto';

@Controller('locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @Get()
  findAllLocales() {
    return this.localesService.findAllLocales();
  }

  @Get('available')
  getAvailableLocales() {
    return this.localesService.getAvailableLocales();
  }

  @Get(':locale')
  findAll(@Param('locale') locale: string) {
    return this.localesService.findAll(locale);
  }

  @Put('entry')
  updateValue(@Body() dto: UpdateLocaleValueDto) {
    return this.localesService.updateValue(dto);
  }

  @Put('bulk')
  bulkUpdate(@Body() dto: BulkUpdateLocaleDto) {
    return this.localesService.bulkUpdate(dto);
  }
}
