export interface Acronym {
  acronym: string;
  description: string;
}

export interface AcronymGroup {
  acronyms: Acronym[];
  isOnly: boolean;
}
