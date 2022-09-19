"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const acronym_service_1 = tslib_1.__importDefault(require("@services/acronym.service"));
class AcronymController {
    constructor() {
        this.acronymService = new acronym_service_1.default();
        this.readAcronym = async (req, res, next) => {
            try {
                const { from = 0, limit = 10, search = '' } = req.query;
                const { acronyms, isOnly } = await this.acronymService.readAcronym(from, limit, search);
                res.setHeader('isOnly', isOnly.toString());
                res.status(200).json({
                    data: acronyms,
                    type: 'success',
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.createAcronym = async (req, res, next) => {
            try {
                const acronymData = req.body;
                const isSuccess = await this.acronymService.createAcronym(acronymData.acronym, acronymData.description);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'A new acronym created.',
                        type: 'success',
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed',
                    });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.updateAcronym = async (req, res, next) => {
            try {
                const nowAcronym = req.params.nowAcronym;
                const newAcronym = req.body.newAcronym;
                const newDescription = req.body.newDescription;
                const isSuccess = await this.acronymService.updateAcronym(nowAcronym, newAcronym, newDescription);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'The acronym updated successfully.',
                        type: 'success',
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed',
                    });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteAcronym = async (req, res, next) => {
            try {
                const acronym = req.params.acronym;
                const isSuccess = await this.acronymService.deleteAcronym(acronym);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'The acronym deleted successfully.',
                        type: 'success',
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed',
                    });
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AcronymController;
//# sourceMappingURL=acronym.controller.js.map