'use client';
import { useLanguage } from '@/context/language-context';

export default function PrivacyPolicyPage() {
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{translate('privacy.title') as string}</h1>
      <div className="space-y-4">
        <p>{translate('privacy.p1') as string}</p>
        <p>{translate('privacy.p2') as string}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle1') as string}</h2>
        <p>{translate('privacy.p3') as string}</p>
        <ul className="list-disc list-inside">
          <li>{translate('privacy.l1') as string  }</li>
          <li>{translate('privacy.l2') as string}</li>
          <li>{translate('privacy.l3') as string}</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle2') as string}</h2>
        <p>{translate('privacy.p4') as string}</p>
        <h2 className="text-2xl font-bold mt-6">{translate('privacy.subtitle3') as string}</h2>
        <p>{translate('privacy.p5') as string}</p>
      </div>
    </div>
  );
}
