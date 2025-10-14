'use client';
import { useLanguage } from '@/context/language-context';

export default function TermsAndConditionsPage() {
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{translate('terms.title')}</h1>
      <div className="space-y-4">
        <p>{translate('terms.p1')}</p>
        <p>{translate('terms.p2')}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('terms.subtitle1')}</h2>
        <p>{translate('terms.p3')}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('terms.subtitle2')}</h2>
        <p>{translate('terms.p4')}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('terms.subtitle3')}</h2>
        <p>{translate('terms.p5')}</p>
      </div>
    </div>
  );
}
