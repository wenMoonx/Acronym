"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAcronymDto = exports.updateAcronymDto = exports.CreateAcronymDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAcronymDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAcronymDto.prototype, "acronym", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAcronymDto.prototype, "description", void 0);
exports.CreateAcronymDto = CreateAcronymDto;
class updateAcronymDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], updateAcronymDto.prototype, "newAcronym", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], updateAcronymDto.prototype, "newDescription", void 0);
exports.updateAcronymDto = updateAcronymDto;
class deleteAcronymDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], deleteAcronymDto.prototype, "acronym", void 0);
exports.deleteAcronymDto = deleteAcronymDto;
//# sourceMappingURL=acronym.dto.js.map