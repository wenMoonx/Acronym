export interface Acronym {
  _id: string;
  acronym: string;
  description: string;
}

export interface AcronymGroup {
  acronyms: Acronym[];
  isOnly: boolean;
}
