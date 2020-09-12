export enum FirestoreCollection {
  Countries = 'countries'
}

export type Option = Country;

export interface City {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  phoneCode: string;
  cities: City[];
}
