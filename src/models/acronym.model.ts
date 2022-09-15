// import fs from 'fs';
// import { HttpException } from '@exceptions/HttpException';
// const filePath = './src/config/db.json';

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

import { model, Schema, Document } from 'mongoose';
import { Acronym } from '@interfaces/acronym.interface';

const acronymSchema: Schema = new Schema({
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

const acronymModel = model<Acronym & Document>('Acronym', acronymSchema);

export default acronymModel;
