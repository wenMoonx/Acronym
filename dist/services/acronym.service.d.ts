/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Acronym, AcronymGroup } from '@interfaces/acronym.interface';
declare class AcronymService {
    acronyms: import("mongoose").Model<Acronym & import("mongoose").Document<any, any, any>, {}, {}, {}, any>;
    readAcronym(from: number, limit: number, search: string): Promise<AcronymGroup>;
    createAcronym(acronym: string, description: string): Promise<boolean>;
    updateAcronym(nowAcronym: string, newAcronym: string, newDescription: string): Promise<boolean>;
    deleteAcronym(deleteAcronym: string): Promise<import("mongodb").DeleteResult>;
}
export default AcronymService;
