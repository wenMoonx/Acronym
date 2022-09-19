"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const acronym_controller_1 = tslib_1.__importDefault(require("@controllers/acronym.controller"));
const acronym_dto_1 = require("@dtos/acronym.dto");
const validation_middleware_1 = tslib_1.__importDefault(require("@middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("@middlewares/auth.middleware"));
class AcronymRoute {
    constructor() {
        this.path = '/acronym';
        this.router = (0, express_1.Router)();
        this.acronymController = new acronym_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.acronymController.readAcronym);
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(acronym_dto_1.CreateAcronymDto, 'body'), this.acronymController.createAcronym);
        this.router.put(`${this.path}/:nowAcronym`, auth_middleware_1.default, (0, validation_middleware_1.default)(acronym_dto_1.updateAcronymDto, 'body'), this.acronymController.updateAcronym);
        this.router.delete(`${this.path}/:acronym`, auth_middleware_1.default, (0, validation_middleware_1.default)(acronym_dto_1.deleteAcronymDto, 'params'), this.acronymController.deleteAcronym);
    }
}
exports.default = AcronymRoute;
//# sourceMappingURL=acronym.route.js.map