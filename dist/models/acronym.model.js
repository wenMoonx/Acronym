"use strict";
// import fs from 'fs';
// import { HttpException } from '@exceptions/HttpException';
// const filePath = './src/config/db.json';
Object.defineProperty(exports, "__esModule", { value: true });
// const readFile = () => {
//   return JSON.parse(fs.readFileSync(filePath, 'utf8').toString());
// };
// const writeFile = (newFile: string) => {
//   try {
//     fs.writeFileSync(filePath, newFile);
//   } catch (error) {
//     throw new HttpException(409, 'An error occured while writing the json file.');
//   }
//   return true;
// };
// export default { readFile, writeFile };
const mongoose_1 = require("mongoose");
const acronymSchema = new mongoose_1.Schema({
    acronym: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const acronymModel = (0, mongoose_1.model)('Acronym', acronymSchema);
exports.default = acronymModel;
//# sourceMappingURL=acronym.model.js.map