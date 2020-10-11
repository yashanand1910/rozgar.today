import { User as FirebaseUser } from 'firebase';
import { City, Country, Reference } from '@core/models';

// User as per Firebase Auth
export interface User {
  uid: FirebaseUser['uid'];
  emailVerified: FirebaseUser['emailVerified'];
  email: FirebaseUser['email'];
  displayName: FirebaseUser['displayName'];
  phoneNumber: FirebaseUser['phoneNumber'];
}

// Stored in Firestore
export interface StoreUser {
  profile: Profile;
  state?: any;
}

export interface Profile {
  phoneCode: string;
  phoneNumber: string;
  country: Reference<Country>;
  preferredCities: Reference<City>[];
  lastSalary: number;
}
