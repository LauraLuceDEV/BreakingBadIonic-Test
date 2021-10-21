/* eslint-disable @typescript-eslint/naming-convention */

export interface BBCharacter {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  nickname: string;
  appearance: string[];
  portrayed: string;
  category: string[];
}

export interface characterQuote{
  quote_id: number;
  quote: string;
  author: string;
}
