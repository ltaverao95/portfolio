import { FirebaseApp } from 'firebase/app';
import { useFirebase } from './use_firebase';

export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};
