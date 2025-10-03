'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();
  const { translate } = useLanguage();
  // Use the specific error type for the state for type safety.
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    // The callback now expects a strongly-typed error, matching the event payload.
    const handleError = (error: FirestorePermissionError) => {
      // Set error in state to trigger a re-render.
      setError(error);
    };

    // The typed emitter will enforce that the callback for 'permission-error'
    // matches the expected payload type (FirestorePermissionError).
    errorEmitter.on('permission-error', handleError);

    // Unsubscribe on unmount to prevent memory leaks.
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  // On re-render, if an error exists in state, show a toast and reset.
  useEffect(() => {
    if (error) {
        toast({
            variant: 'destructive',
            title: translate('admin.toast.permissionError.title') as string,
            description: error.message || (translate('admin.toast.permissionError.defaultMessage') as string),
        });
        setError(null); // Reset error after showing toast
    }
  }, [error, toast, translate]);

  // This component renders nothing.
  return null;
}
