'use client';

import { useAuth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { BlogDataTable } from '@/components/admin/blog-data-table';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AdminPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { translate } = useLanguage();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">{translate('admin.login.title')}</h1>
        <p className="text-muted-foreground mb-8">{translate('admin.login.description')}</p>
        <Button onClick={handleGoogleSignIn} size="lg">
          {translate('admin.login.button')}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <BlogDataTable />
    </div>
  );
}
