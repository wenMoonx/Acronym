"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _httpException = require("../exceptions/HttpException");
const _acronymModel = _interopRequireDefault(require("../models/acronym.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AcronymService = class AcronymService {
    async readAcronym(from, limit, search) {
        const findAcronyms = this.acronyms.filter((acronym)=>{
            const key = Object.keys(acronym)[0];
            if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
                return acronym;
            }
        });
        return {
            acronyms: findAcronyms.slice(Number(from), Number(from) + Number(limit) + 1),
            isOnly: findAcronyms.length >= limit
        };
    }
    async createAcronym(acronym, description) {
        if (this.acronyms.some((data)=>Object.keys(data)[0] === acronym)) throw new _httpException.HttpException(409, 'Acronym already exist');
        this.acronyms.push({
            [acronym]: description
        });
        return _acronymModel.default.writeFile(JSON.stringify(this.acronyms));
    }
    async updateAcronym(nowAcronym, newAcronym) {
        const findAcronym = this.acronyms.find((acronym)=>Object.keys(acronym)[0] === nowAcronym);
        if (!findAcronym) throw new _httpException.HttpException(409, "Acronym doesn't exist");
        const updateAcronymData = this.acronyms.map((acronym)=>{
            if (Object.keys(acronym)[0] === nowAcronym) acronym = {
                [newAcronym]: acronym[nowAcronym]
            };
            return acronym;
        });
        return _acronymModel.default.writeFile(JSON.stringify(updateAcronymData));
    }
    async deleteAcronym(deleteAcronym) {
        const findAcronym = this.acronyms.find((acronym)=>Object.keys(acronym)[0] === deleteAcronym);
        if (!findAcronym) throw new _httpException.HttpException(409, "Acronym doesn't exist");
        const deleteAcronymData = this.acronyms.filter((acronym)=>Object.keys(acronym)[0] !== deleteAcronym);
        return _acronymModel.default.writeFile(JSON.stringify(deleteAcronymData));
    }
    constructor(){
        this.acronyms = _acronymModel.default.readFile();
    }
};
const _default = AcronymService;

//# sourceMappingURL=acronym.service.js.map