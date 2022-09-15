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
const resolvers = {
    readAcronym: async ({ from , limit , search  })=>{
        const findAcronyms = await _acronymModel.default.find({
            description: {
                $regex: search
            }
        }).skip(from).limit(limit);
        return {
            isOnly: true,
            acronyms: findAcronyms
        };
    },
    createAcronym: async ({ acronym , description  })=>{
        if ((0, _util.isEmpty)(acronym) || (0, _util.isEmpty)(description)) throw new _httpException.HttpException(400, 'AcronymData is empty');
        const findAcronym = await _acronymModel.default.findOne({
            acronym: acronym
        });
        if (!(0, _util.isEmpty)(findAcronym)) throw new _httpException.HttpException(409, `This WTF:${acronym} already exists`);
        await _acronymModel.default.create({
            acronym: acronym,
            description: description
        });
        return true;
    },
    updateAcronym: async ({ nowAcronym , newAcronym , newDescription  })=>{
        if ((0, _util.isEmpty)(newAcronym) || (0, _util.isEmpty)(newDescription)) throw new _httpException.HttpException(400, 'acronymData is empty');
        const findNowAcronym = await _acronymModel.default.findOne({
            acronym: nowAcronym
        });
        if ((0, _util.isEmpty)(findNowAcronym)) throw new _httpException.HttpException(409, 'Acronym does not exist');
        const findAcronym = await _acronymModel.default.findOne({
            acronym: newAcronym
        });
        if (findAcronym && findAcronym.acronym != nowAcronym) throw new _httpException.HttpException(409, `This WTF:${newAcronym} already exists`);
        await _acronymModel.default.updateOne({
            acronym: nowAcronym
        }, {
            acronym: newAcronym,
            description: newDescription
        });
        return true;
    },
    deleteAcronym: async ({ deleteAcronym  })=>{
        const findAcronym = await _acronymModel.default.findOne({
            acronym: deleteAcronym
        });
        if ((0, _util.isEmpty)(findAcronym)) throw new _httpException.HttpException(409, "Acronym doesn't exist");
        await _acronymModel.default.deleteOne({
            acronym: deleteAcronym
        });
        return true;
    }
};
const _default = resolvers;

//# sourceMappingURL=resolvers.js.map