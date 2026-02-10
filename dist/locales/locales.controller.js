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
exports.LocalesController = void 0;
const common_1 = require("@nestjs/common");
const locales_service_1 = require("./locales.service");
const update_locale_dto_1 = require("./dto/update-locale.dto");
let LocalesController = class LocalesController {
    localesService;
    constructor(localesService) {
        this.localesService = localesService;
    }
    findAllLocales() {
        return this.localesService.findAllLocales();
    }
    getAvailableLocales() {
        return this.localesService.getAvailableLocales();
    }
    findAll(locale) {
        return this.localesService.findAll(locale);
    }
    updateValue(dto) {
        return this.localesService.updateValue(dto);
    }
    bulkUpdate(dto) {
        return this.localesService.bulkUpdate(dto);
    }
};
exports.LocalesController = LocalesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocalesController.prototype, "findAllLocales", null);
__decorate([
    (0, common_1.Get)('available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocalesController.prototype, "getAvailableLocales", null);
__decorate([
    (0, common_1.Get)(':locale'),
    __param(0, (0, common_1.Param)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)('entry'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_locale_dto_1.UpdateLocaleValueDto]),
    __metadata("design:returntype", void 0)
], LocalesController.prototype, "updateValue", null);
__decorate([
    (0, common_1.Put)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_locale_dto_1.BulkUpdateLocaleDto]),
    __metadata("design:returntype", void 0)
], LocalesController.prototype, "bulkUpdate", null);
exports.LocalesController = LocalesController = __decorate([
    (0, common_1.Controller)('locales'),
    __metadata("design:paramtypes", [locales_service_1.LocalesService])
], LocalesController);
//# sourceMappingURL=locales.controller.js.map