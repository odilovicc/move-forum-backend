"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const speakers_module_1 = require("./speakers/speakers.module");
const faq_module_1 = require("./faq/faq.module");
const locales_module_1 = require("./locales/locales.module");
const speaker_entity_1 = require("./speakers/speaker.entity");
const faq_item_entity_1 = require("./faq/faq-item.entity");
const locale_entry_entity_1 = require("./locales/locale-entry.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [speaker_entity_1.Speaker, faq_item_entity_1.FaqItem, locale_entry_entity_1.LocaleEntry],
                    synchronize: true,
                }),
            }),
            speakers_module_1.SpeakersModule,
            faq_module_1.FaqModule,
            locales_module_1.LocalesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map