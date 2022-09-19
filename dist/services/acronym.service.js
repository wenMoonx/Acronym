"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _util = require("../utils/util");
const _httpException = require("../exceptions/HttpException");
const _acronymModel = _interopRequireDefault(require("../models/acronym.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AcronymService = class AcronymService {
    async readAcronym(from, limit, search) {
        const findAcronyms = await this.acronyms.find({
            description: {
                $regex: search
            }
        }).skip(from).limit(limit);
        return {
            isOnly: true,
            acronyms: findAcronyms
        };
    }
    async createAcronym(acronym, description) {
        if ((0, _util.isEmpty)(acronym) || (0, _util.isEmpty)(description)) throw new _httpException.HttpException(400, 'AcronymData is empty');
        const findAcronym = await this.acronyms.findOne({
            acronym: acronym
        });
        if (!(0, _util.isEmpty)(findAcronym)) throw new _httpException.HttpException(409, `This WTF:${acronym} already exists`);
        await this.acronyms.create({
            acronym: acronym,
            description: description
        });
        return true;
    }
    async updateAcronym(nowAcronym, newAcronym, newDescription) {
        if ((0, _util.isEmpty)(newAcronym) || (0, _util.isEmpty)(newDescription)) throw new _httpException.HttpException(400, 'acronymData is empty');
        const findNowAcronym = await this.acronyms.findOne({
            acronym: nowAcronym
        });
        if ((0, _util.isEmpty)(findNowAcronym)) throw new _httpException.HttpException(409, 'Acronym does not exist');
        const findAcronym = await this.acronyms.findOne({
            acronym: newAcronym
        });
        if (findAcronym && findAcronym.acronym != nowAcronym) throw new _httpException.HttpException(409, `This WTF:${newAcronym} already exists`);
        await this.acronyms.updateOne({
            acronym: nowAcronym
        }, {
            acronym: newAcronym,
            description: newDescription
        });
        return true;
    }
    async deleteAcronym(deleteAcronym) {
        const findAcronym = await this.acronyms.findOne({
            acronym: deleteAcronym
        });
        if ((0, _util.isEmpty)(findAcronym)) throw new _httpException.HttpException(409, "Acronym doesn't exist");
        return await this.acronyms.deleteOne({
            acronym: deleteAcronym
        });
    }
    constructor(){
        this.acronyms = _acronymModel.default;
    }
};
const _default = AcronymService;

//# sourceMappingURL=acronym.service.js.map