
'use client';

import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push(translate('routes.admin') as string);
    }
  }, [isUserLoading, user, router, translate]);


  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: translate('login.toast.success.title') as string,
        description: translate('login.toast.success.description') as string,
      });
    } catch (error) {
      console.error('Error signing in with Google', error);
      toast({
        variant: 'destructive',
        title: translate('login.toast.error.title') as string,
        description: translate('login.toast.error.description') as string,
      });
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center -mt-16">
      <div className="max-w-md w-full p-8 space-y-8">
        <h1 className="text-3xl font-bold">{translate('login.title')}</h1>
        <p className="text-muted-foreground">{translate('login.description')}</p>
        <Button onClick={handleGoogleSignIn} size="lg" className="w-full">
          {translate('login.button')}
        </Button>
      </div>
    </div>
  );
}
