'use client';
import { useLanguage } from '@/context/language-context';

export default function PrivacyPolicyPage() {
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{translate('privacy.title')}</h1>
      <div className="space-y-4">
        <p>{translate('privacy.p1')}</p>
        <p>{translate('privacy.p2')}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle1')}</h2>
        <p>{translate('privacy.p3')}</p>
        <ul className="list-disc list-inside">
          <li>{translate('privacy.l1')}</li>
          <li>{translate('privacy.l2')}</li>
          <li>{translate('privacy.l3')}</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle2')}</h2>
        <p>{translate('privacy.p4')}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle3')}</h2>
        <p>{translate('privacy.p5')}</p>
      </div>
    </div>
  );
}
