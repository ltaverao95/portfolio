'use client';

import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BlogDataTable } from '@/components/admin/blog-data-table';
import { useLanguage } from '@/context/language-context';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { translate } = useLanguage();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push(translate('routes.login') as string);
    }
  }, [isUserLoading, user, router, translate]);

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <BlogDataTable />
    </div>
  );
}
