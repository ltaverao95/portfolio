import { Firestore } from 'firebase/firestore';
import { useFirebase } from './use_firebase';

export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};
