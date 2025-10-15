import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsAndConditionsPage from '@/app/terms-and-conditions/page';
import { LanguageProvider } from '@/context/language-context';

describe('TermsAndConditionsPage', () => {
  it('renders the terms and conditions page', () => {
    render(
      <LanguageProvider>
        <TermsAndConditionsPage />
      </LanguageProvider>
    );

    expect(screen.getByText('Términos y Condiciones')).toBeInTheDocument();
  });
});
