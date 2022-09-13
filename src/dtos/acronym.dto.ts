import { IsString } from 'class-validator';

export class CreateAcronymDto {
  @IsString()
  public acronym: string;

  @IsString()
  public description: string;
}

export class updateAcronymDto {
  @IsString()
  public newAcronym: string;
}

export class deleteAcronymDto {
  @IsString()
  public acronym: string;
}
