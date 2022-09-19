"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("@/utils/util");
const HttpException_1 = require("@exceptions/HttpException");
const acronym_model_1 = tslib_1.__importDefault(require("@models/acronym.model"));
const resolvers = {
    readAcronym: async ({ from, limit, search }) => {
        const findAcronyms = await acronym_model_1.default
            .find({
            description: { $regex: search },
        })
            .skip(from)
            .limit(limit);
        return {
            isOnly: true,
            acronyms: findAcronyms,
        };
    },
    createAcronym: async ({ acronym, description }) => {
        if ((0, util_1.isEmpty)(acronym) || (0, util_1.isEmpty)(description))
            throw new HttpException_1.HttpException(400, 'AcronymData is empty');
        const findAcronym = await acronym_model_1.default.findOne({ acronym: acronym });
        if (!(0, util_1.isEmpty)(findAcronym))
            throw new HttpException_1.HttpException(409, `This WTF:${acronym} already exists`);
        await acronym_model_1.default.create({
            acronym: acronym,
            description: description,
        });
        return true;
    },
    updateAcronym: async ({ nowAcronym, newAcronym, newDescription }) => {
        if ((0, util_1.isEmpty)(newAcronym) || (0, util_1.isEmpty)(newDescription))
            throw new HttpException_1.HttpException(400, 'acronymData is empty');
        const findNowAcronym = await acronym_model_1.default.findOne({ acronym: nowAcronym });
        if ((0, util_1.isEmpty)(findNowAcronym))
            throw new HttpException_1.HttpException(409, 'Acronym does not exist');
        const findAcronym = await acronym_model_1.default.findOne({ acronym: newAcronym });
        if (findAcronym && findAcronym.acronym != nowAcronym)
            throw new HttpException_1.HttpException(409, `This WTF:${newAcronym} already exists`);
        await acronym_model_1.default.updateOne({ acronym: nowAcronym }, { acronym: newAcronym, description: newDescription });
        return true;
    },
    deleteAcronym: async ({ deleteAcronym }) => {
        const findAcronym = await acronym_model_1.default.findOne({ acronym: deleteAcronym });
        if ((0, util_1.isEmpty)(findAcronym))
            throw new HttpException_1.HttpException(409, "Acronym doesn't exist");
        await acronym_model_1.default.deleteOne({ acronym: deleteAcronym });
        return true;
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map