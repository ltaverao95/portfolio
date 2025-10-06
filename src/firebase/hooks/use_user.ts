import { useFirebase } from './use_firebase';
import { UserHookResult } from '../props/user_hook_result';

export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
