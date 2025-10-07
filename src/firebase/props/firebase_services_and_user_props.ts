import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';

export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}
