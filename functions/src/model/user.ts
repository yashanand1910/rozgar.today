// Stored in Firestore
import { Reference } from './collection';

export interface StoreUser {
  profile?: Profile;
  state?: unknown;
  metadata?: Metadata;
}

export interface Metadata {
  stripeId: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  country: Reference<Country>;
  preferredCities: Reference<City>[];
  lastSalary: number;
}

export interface City {
  id: string;
  name: string;
  country: Reference<Country>;
}

export interface Country {
  id: string;
  name: string;
  phoneCode: string;
}
