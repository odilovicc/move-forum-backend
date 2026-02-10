"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const locale_entry_entity_1 = require("./locale-entry.entity");
let LocalesService = class LocalesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findAll(locale) {
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
        const result = {};
        for (const entry of entries) {
            if (!result[entry.locale])
                result[entry.locale] = {};
            this.setNested(result[entry.locale], entry.key, entry.value);
        }
        return result;
    }
    async updateValue(dto) {
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
    async bulkUpdate(dto) {
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
        return result.map((r) => r.locale);
    }
    entriesToNested(entries) {
        const result = {};
        for (const entry of entries) {
            this.setNested(result, entry.key, entry.value);
        }
        return result;
    }
    setNested(obj, path, value) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
    }
};
exports.LocalesService = LocalesService;
exports.LocalesService = LocalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(locale_entry_entity_1.LocaleEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalesService);
//# sourceMappingURL=locales.service.js.map