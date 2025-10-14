'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SpainFlagIcon } from './icons/spain-flag-icon';
import { USFlagIcon } from './icons/us-flag-icon';
import { useLanguage } from '@/context/language-context';

import Link from 'next/link';

export function AppFooter() {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          <p>© {new Date().getFullYear()} Luis Felipe Tavera Orozco. {translate('footer.designedWithPassion') as string}</p>
          <div className="flex gap-4 justify-center md:justify-start mt-2">
            <Link href="/privacy" className="hover:underline">
              {translate('privacy.title') as string}
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline">
              {translate('terms.title') as string}
            </Link>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <Select value={language} onValueChange={(value) => setLanguage(value as 'es' | 'en')}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={translate('footer.language') as string} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">
                <div className="flex items-center gap-2">
                  <SpainFlagIcon />
                  <span>Español</span>
                </div>
              </SelectItem>
              <SelectItem value="en">
                <div className="flex items-center gap-2">
                  <USFlagIcon />
                  <span>English</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
}