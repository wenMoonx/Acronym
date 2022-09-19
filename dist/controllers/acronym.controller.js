"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _acronymService = _interopRequireDefault(require("../services/acronym.service"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AcronymController = class AcronymController {
    constructor(){
        this.acronymService = new _acronymService.default();
        this.readAcronym = async (req, res, next)=>{
            try {
                const { from =0 , limit =10 , search =''  } = req.query;
                const { acronyms , isOnly  } = await this.acronymService.readAcronym(from, limit, search);
                res.setHeader('isOnly', isOnly.toString());
                res.status(200).json({
                    data: acronyms,
                    type: 'success'
                });
            } catch (error) {
                next(error);
            }
        };
        this.createAcronym = async (req, res, next)=>{
            try {
                const acronymData = req.body;
                const isSuccess = await this.acronymService.createAcronym(acronymData.acronym, acronymData.description);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'A new acronym created.',
                        type: 'success'
                    });
                } else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed'
                    });
                }
            } catch (error) {
                next(error);
            }
        };
        this.updateAcronym = async (req, res, next)=>{
            try {
                const nowAcronym = req.params.nowAcronym;
                const newAcronym = req.body.newAcronym;
                const newDescription = req.body.newDescription;
                const isSuccess = await this.acronymService.updateAcronym(nowAcronym, newAcronym, newDescription);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'The acronym updated successfully.',
                        type: 'success'
                    });
                } else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed'
                    });
                }
            } catch (error) {
                next(error);
            }
        };
        this.deleteAcronym = async (req, res, next)=>{
            try {
                const acronym = req.params.acronym;
                const isSuccess = await this.acronymService.deleteAcronym(acronym);
                if (isSuccess) {
                    res.status(200).json({
                        message: 'The acronym deleted successfully.',
                        type: 'success'
                    });
                } else {
                    res.status(200).json({
                        message: 'Try again.',
                        type: 'failed'
                    });
                }
            } catch (error) {
                next(error);
            }
        };
    }
};
const _default = AcronymController;

//# sourceMappingURL=acronym.controller.js.map