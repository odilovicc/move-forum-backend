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
exports.SpeakersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const speaker_entity_1 = require("./speaker.entity");
let SpeakersService = class SpeakersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { order: 'ASC' } }).then((speakers) => {
            return speakers.map((speaker) => ({
                ...speaker,
                photo: this.normalizePhoto(speaker.photo),
            }));
        });
    }
    async findOne(id) {
        const speaker = await this.repo.findOneBy({ id });
        if (!speaker)
            throw new common_1.NotFoundException(`Speaker #${id} not found`);
        return {
            ...speaker,
            photo: this.normalizePhoto(speaker.photo),
        };
    }
    async create(dto) {
        if (dto.order === undefined) {
            const max = await this.repo
                .createQueryBuilder('s')
                .select('MAX(s.order)', 'maxOrder')
                .getRawOne();
            dto.order = (max?.maxOrder ?? -1) + 1;
        }
        const speaker = this.repo.create(dto);
        return this.repo.save(speaker);
    }
    async update(id, dto) {
        const speaker = await this.findOne(id);
        Object.assign(speaker, dto);
        return this.repo.save(speaker);
    }
    async updatePhoto(id, photoPath) {
        return this.update(id, { photo: photoPath });
    }
    async reorder(ids) {
        const updates = ids.map((id, index) => this.repo.update(id, { order: index }));
        await Promise.all(updates);
        return this.findAll();
    }
    async remove(id) {
        const speaker = await this.repo.findOneBy({ id });
        if (!speaker)
            throw new common_1.NotFoundException(`Speaker #${id} not found`);
        return this.repo.remove(speaker);
    }
    normalizePhoto(photo) {
        if (!photo) {
            return '';
        }
        if (photo.startsWith('/uploads/') ||
            photo.startsWith('http://') ||
            photo.startsWith('https://')) {
            return photo;
        }
        return '';
    }
};
exports.SpeakersService = SpeakersService;
exports.SpeakersService = SpeakersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(speaker_entity_1.Speaker)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SpeakersService);
//# sourceMappingURL=speakers.service.js.map