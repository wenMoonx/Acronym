import { HttpException } from '@exceptions/HttpException';
import { Acronym, AcronymGroup } from '@interfaces/acronym.interface';
import acronymModel from '@models/acronym.model';

class AcronymService {
  public acronyms = acronymModel.readFile();

  public async readAcronym(from: number, limit: number, search: string): Promise<AcronymGroup> {
    const findAcronyms: Acronym[] = this.acronyms.filter(acronym => {
      const key = Object.keys(acronym)[0];
      if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
        return acronym;
      }
    });
    return {
      acronyms: findAcronyms.slice(Number(from), Number(from) + Number(limit) + 1),
      isOnly: findAcronyms.length >= limit,
    };
  }

  public async createAcronym(acronym: string, description: string) {
    if (this.acronyms.some((data: any) => Object.keys(data)[0] === acronym)) throw new HttpException(409, 'Acronym already exist');

    this.acronyms.push({ [acronym]: description });
    return acronymModel.writeFile(JSON.stringify(this.acronyms));
  }

  public async updateAcronym(nowAcronym: string, newAcronym: string) {
    const findAcronym: Acronym = this.acronyms.find(acronym => Object.keys(acronym)[0] === nowAcronym);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    const updateAcronymData: Acronym[] = this.acronyms.map((acronym: any) => {
      if (Object.keys(acronym)[0] === nowAcronym) acronym = { [newAcronym]: acronym[nowAcronym] };
      return acronym;
    });

    return acronymModel.writeFile(JSON.stringify(updateAcronymData));
  }

  public async deleteAcronym(deleteAcronym: string) {
    const findAcronym: Acronym = this.acronyms.find(acronym => Object.keys(acronym)[0] === deleteAcronym);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    const deleteAcronymData: Acronym[] = this.acronyms.filter(acronym => Object.keys(acronym)[0] !== deleteAcronym);

    return acronymModel.writeFile(JSON.stringify(deleteAcronymData));
  }
}

export default AcronymService;
