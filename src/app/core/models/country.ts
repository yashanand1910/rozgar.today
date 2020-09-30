import { Reference } from '@core/models';

export interface City {
  id: string;
  name: string;
  country: Reference;
}

export interface Country {
  id: string;
  name: string;
  phoneCode: string;
}
