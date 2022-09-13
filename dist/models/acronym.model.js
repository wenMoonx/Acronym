"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _fs = _interopRequireDefault(require("fs"));
const _httpException = require("../exceptions/HttpException");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const filePath = './src/config/db.json';
const readFile = ()=>{
    return JSON.parse(_fs.default.readFileSync(filePath, 'utf8').toString());
};
const writeFile = (newFile)=>{
    try {
        _fs.default.writeFileSync(filePath, newFile);
    } catch (error) {
        throw new _httpException.HttpException(409, 'An error occured while writing the json file.');
    }
    return true;
};
const _default = {
    readFile,
    writeFile
};

//# sourceMappingURL=acronym.model.js.map