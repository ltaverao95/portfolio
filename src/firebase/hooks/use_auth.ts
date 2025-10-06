import { Auth } from 'firebase/auth';
import { useFirebase } from './use_firebase';

export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};
