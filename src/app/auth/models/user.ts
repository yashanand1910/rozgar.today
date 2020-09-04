import { User as FirebaseUser } from 'firebase';

export interface User {
  uid: string;
  emailVerified: FirebaseUser['emailVerified'];
  email: FirebaseUser['email'];
  displayName: FirebaseUser['displayName'];
  phoneNumber: FirebaseUser['phoneNumber'];
}

export interface UserProfile {
  phoneNumber: string;
}
