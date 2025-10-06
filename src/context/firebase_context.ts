import { createContext } from 'react';
import { FirebaseContextState } from '../firebase/states/firebase_context_state';

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);
