import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from '@/app/privacy/page';
import { LanguageProvider } from '@/context/language-context';

describe('PrivacyPolicyPage', () => {
  it('renders the privacy policy page', () => {
    render(
      <LanguageProvider>
        <PrivacyPolicyPage />
      </LanguageProvider>
    );

    expect(screen.getByText('Política de Privacidad')).toBeInTheDocument();
  });
});
