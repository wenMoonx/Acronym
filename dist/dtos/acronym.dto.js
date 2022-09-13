"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CreateAcronymDto: ()=>CreateAcronymDto,
    updateAcronymDto: ()=>updateAcronymDto,
    deleteAcronymDto: ()=>deleteAcronymDto
});
const _classValidator = require("class-validator");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let CreateAcronymDto = class CreateAcronymDto {
};
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateAcronymDto.prototype, "acronym", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateAcronymDto.prototype, "description", void 0);
let updateAcronymDto = class updateAcronymDto {
};
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], updateAcronymDto.prototype, "newAcronym", void 0);
let deleteAcronymDto = class deleteAcronymDto {
};
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], deleteAcronymDto.prototype, "acronym", void 0);

//# sourceMappingURL=acronym.dto.js.map