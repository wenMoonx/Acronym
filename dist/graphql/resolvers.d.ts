import { AcronymGroup } from '@interfaces/acronym.interface';
declare const resolvers: {
    readAcronym: ({ from, limit, search }: any) => Promise<AcronymGroup>;
    createAcronym: ({ acronym, description }: any) => Promise<boolean>;
    updateAcronym: ({ nowAcronym, newAcronym, newDescription }: any) => Promise<boolean>;
    deleteAcronym: ({ deleteAcronym }: any) => Promise<boolean>;
};
export default resolvers;
