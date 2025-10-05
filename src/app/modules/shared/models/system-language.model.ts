export enum SystemLanguage {
  ENGLISH = 'en',
  ARABIC = 'ar',
}

export interface ILanguage {
  name: string;
  code: string;
}

export const Languages: ILanguage[] = [
  { code: 'ar', name: 'arabic' },
  { code: 'en', name: 'english' },
];
