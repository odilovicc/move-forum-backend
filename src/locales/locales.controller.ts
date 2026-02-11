import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join, extname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { diskStorage } from 'multer';
import { LocalesService } from './locales.service';
import { UpdateLocaleValueDto, BulkUpdateLocaleDto } from './dto/update-locale.dto';

const brandingUploadsPath = join(process.cwd(), 'uploads', 'branding');
mkdirSync(brandingUploadsPath, { recursive: true });

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

  @Post('branding/logo/:locale')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: brandingUploadsPath,
        filename: (_req: any, file:any, cb:any) => {
          const ext = extname(file.originalname) || '';
          const safeExt = ext.toLowerCase();
          const name = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadBrandingLogo(
    @Param('locale') locale: string,
    @UploadedFile() file: { filename: string },
  ) {
    const logoPath = `/uploads/branding/${file.filename}`;
    await this.localesService.updateValue({
      locale,
      key: 'branding.logo',
      value: logoPath,
    });
    return { locale, key: 'branding.logo', value: logoPath };
  }
}
