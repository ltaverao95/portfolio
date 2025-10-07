import { useContext } from "react";
import { FirebaseContext } from "../../context/firebase_context";
import { FirebaseServicesAndUser } from "../props/firebase_services_and_user_props";

export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider.");
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.auth) {
    throw new Error(
      "Firebase core services not available. Check FirebaseProvider props."
    );
  }

  return {
    firebaseApp: context.firebaseApp,
    auth: context.auth,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
  };
};
