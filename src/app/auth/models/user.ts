import firebase from 'firebase/app';
import FirebaseUser = firebase.User;
import { City, Country, Reference } from '@core/models';

// User as per Firebase Auth. Needs to be a seperate interface because this will be stored in the state.
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
