"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("@/utils/util");
const HttpException_1 = require("@exceptions/HttpException");
const acronym_model_1 = tslib_1.__importDefault(require("@models/acronym.model"));
// class AcronymService {
//   public acronyms = acronymModel.readFile();
//   public async readAcronym(from: number, limit: number, search: string): Promise<AcronymGroup> {
//     const findAcronyms: Acronym[] = this.acronyms.filter(acronym => {
//       const key = Object.keys(acronym)[0];
//       if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
//         return acronym;
//       }
//     });
//     return {
//       acronyms: findAcronyms.slice(Number(from), Number(from) + Number(limit) + 1),
//       isOnly: findAcronyms.length >= limit,
//     };
//   }
//   public async createAcronym(acronym: string, description: string) {
//     if (this.acronyms.some((data: any) => Object.keys(data)[0] === acronym)) throw new HttpException(409, 'Acronym already exist');
//     this.acronyms.push({ [acronym]: description });
//     return acronymModel.writeFile(JSON.stringify(this.acronyms));
//   }
//   public async updateAcronym(nowAcronym: string, newAcronym: string) {
//     const findAcronym: Acronym = this.acronyms.find(acronym => Object.keys(acronym)[0] === nowAcronym);
//     if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");
//     const updateAcronymData: Acronym[] = this.acronyms.map((acronym: any) => {
//       if (Object.keys(acronym)[0] === nowAcronym) acronym = { [newAcronym]: acronym[nowAcronym] };
//       return acronym;
//     });
//     return acronymModel.writeFile(JSON.stringify(updateAcronymData));
//   }
//   public async deleteAcronym(deleteAcronym: string) {
//     const findAcronym: Acronym = this.acronyms.find(acronym => Object.keys(acronym)[0] === deleteAcronym);
//     if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");
//     const deleteAcronymData: Acronym[] = this.acronyms.filter(acronym => Object.keys(acronym)[0] !== deleteAcronym);
//     return acronymModel.writeFile(JSON.stringify(deleteAcronymData));
//   }
// }
class AcronymService {
    constructor() {
        this.acronyms = acronym_model_1.default;
    }
    async readAcronym(from, limit, search) {
        const findAcronyms = await this.acronyms
            .find({
            description: { $regex: search },
        })
            .skip(from)
            .limit(limit);
        return {
            isOnly: true,
            acronyms: findAcronyms,
        };
    }
    async createAcronym(acronym, description) {
        if ((0, util_1.isEmpty)(acronym) || (0, util_1.isEmpty)(description))
            throw new HttpException_1.HttpException(400, 'AcronymData is empty');
        const findAcronym = await this.acronyms.findOne({ acronym: acronym });
        if (!(0, util_1.isEmpty)(findAcronym))
            throw new HttpException_1.HttpException(409, `This WTF:${acronym} already exists`);
        await this.acronyms.create({
            acronym: acronym,
            description: description,
        });
        return true;
    }
    async updateAcronym(nowAcronym, newAcronym, newDescription) {
        if ((0, util_1.isEmpty)(newAcronym) || (0, util_1.isEmpty)(newDescription))
            throw new HttpException_1.HttpException(400, 'acronymData is empty');
        const findNowAcronym = await this.acronyms.findOne({ acronym: nowAcronym });
        if ((0, util_1.isEmpty)(findNowAcronym))
            throw new HttpException_1.HttpException(409, 'Acronym does not exist');
        const findAcronym = await this.acronyms.findOne({ acronym: newAcronym });
        if (findAcronym && findAcronym.acronym != nowAcronym)
            throw new HttpException_1.HttpException(409, `This WTF:${newAcronym} already exists`);
        await this.acronyms.updateOne({ acronym: nowAcronym }, { acronym: newAcronym, description: newDescription });
        return true;
    }
    async deleteAcronym(deleteAcronym) {
        const findAcronym = await this.acronyms.findOne({ acronym: deleteAcronym });
        if ((0, util_1.isEmpty)(findAcronym))
            throw new HttpException_1.HttpException(409, "Acronym doesn't exist");
        return await this.acronyms.deleteOne({ acronym: deleteAcronym });
    }
}
exports.default = AcronymService;
//# sourceMappingURL=acronym.service.js.map