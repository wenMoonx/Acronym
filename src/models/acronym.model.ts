import fs from 'fs';
import { HttpException } from '@exceptions/HttpException';
const filePath = './src/config/db.json';

const readFile = () => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').toString());
};

const writeFile = (newFile: string) => {
  try {
    fs.writeFileSync(filePath, newFile);
  } catch (error) {
    throw new HttpException(409, 'An error occured while writing the json file.');
  }

  return true;
};

export default { readFile, writeFile };
