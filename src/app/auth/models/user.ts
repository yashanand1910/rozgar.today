import { City, Country, Reference } from '@core/models';
import { State } from '@core/reducers';

// User as per Firebase Auth. Needs to be a separate interface because this will be stored in the state.
export interface User {
  uid: string;
  emailVerified: boolean;
  email: string;
  displayName: string;
  phoneNumber: string;
}

// Stored in Firestore
export interface StoreUser {
  profile: Profile;
  state?: Partial<State>;
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
