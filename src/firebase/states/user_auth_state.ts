import { User } from 'firebase/auth';

export interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}
