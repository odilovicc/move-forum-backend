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
exports.SpeakersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const speakers_service_1 = require("./speakers.service");
const create_speaker_dto_1 = require("./dto/create-speaker.dto");
const update_speaker_dto_1 = require("./dto/update-speaker.dto");
const speakerUploadsPath = (0, node_path_1.join)(process.cwd(), 'uploads', 'speakers');
(0, node_fs_1.mkdirSync)(speakerUploadsPath, { recursive: true });
let SpeakersController = class SpeakersController {
    speakersService;
    constructor(speakersService) {
        this.speakersService = speakersService;
    }
    findAll() {
        return this.speakersService.findAll();
    }
    findOne(id) {
        return this.speakersService.findOne(id);
    }
    create(dto) {
        return this.speakersService.create(dto);
    }
    reorder(body) {
        return this.speakersService.reorder(body.ids);
    }
    async uploadPhoto(id, file) {
        const photoPath = `/uploads/speakers/${file.filename}`;
        return this.speakersService.updatePhoto(id, photoPath);
    }
    update(id, dto) {
        return this.speakersService.update(id, dto);
    }
    remove(id) {
        return this.speakersService.remove(id);
    }
};
exports.SpeakersController = SpeakersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaker_dto_1.CreateSpeakerDto]),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('reorder/batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "reorder", null);
__decorate([
    (0, common_1.Post)(':id/photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: speakerUploadsPath,
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SpeakersController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_speaker_dto_1.UpdateSpeakerDto]),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpeakersController.prototype, "remove", null);
exports.SpeakersController = SpeakersController = __decorate([
    (0, common_1.Controller)('speakers'),
    __metadata("design:paramtypes", [speakers_service_1.SpeakersService])
], SpeakersController);
//# sourceMappingURL=speakers.controller.js.map