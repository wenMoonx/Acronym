import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Acronym, AcronymGroup } from '@interfaces/acronym.interface';
import acronymModel from '@models/acronym.model';

const resolvers = {
  readAcronym: async ({ from, limit, search }: any): Promise<AcronymGroup> => {
    const findAcronyms: Acronym[] = await acronymModel
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

  createAcronym: async ({ acronym, description }: any) => {
    if (isEmpty(acronym) || isEmpty(description)) throw new HttpException(400, 'AcronymData is empty');

    const findAcronym: Acronym = await acronymModel.findOne({ acronym: acronym });
    if (!isEmpty(findAcronym)) throw new HttpException(409, `This WTF:${acronym} already exists`);
    await acronymModel.create({
      acronym: acronym,
      description: description,
    });

    return true;
  },

  updateAcronym: async ({ nowAcronym, newAcronym, newDescription }: any) => {
    if (isEmpty(newAcronym) || isEmpty(newDescription)) throw new HttpException(400, 'acronymData is empty');

    const findNowAcronym: Acronym = await acronymModel.findOne({ acronym: nowAcronym });
    if (isEmpty(findNowAcronym)) throw new HttpException(409, 'Acronym does not exist');
    const findAcronym: Acronym = await acronymModel.findOne({ acronym: newAcronym });
    if (findAcronym && findAcronym.acronym != nowAcronym) throw new HttpException(409, `This WTF:${newAcronym} already exists`);

    await acronymModel.updateOne({ acronym: nowAcronym }, { acronym: newAcronym, description: newDescription });

    return true;
  },

  deleteAcronym: async ({ deleteAcronym }: any) => {
    const findAcronym: Acronym = await acronymModel.findOne({ acronym: deleteAcronym });
    if (isEmpty(findAcronym)) throw new HttpException(409, "Acronym doesn't exist");

    await acronymModel.deleteOne({ acronym: deleteAcronym });
    return true;
  },
};

export default resolvers;
