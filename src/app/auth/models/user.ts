import { User as FirebaseUser } from 'firebase';

export interface User {
  uid: string;
  emailVerified: FirebaseUser['emailVerified'];
  email: FirebaseUser['email'];
  displayName: FirebaseUser['displayName'];
  phoneNumber: FirebaseUser['phoneNumber'];
}

export interface StoreUser {
  profile: Profile;
}

export interface Profile {
  displayName?: User['displayName'];
  phoneNumber?: User['phoneNumber'];
}
