import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppFooter } from '../app-footer';
import { LanguageProvider } from '@/context/language-context';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('AppFooter', () => {
  it('renders the footer with links to privacy and terms', () => {
    render(
      <LanguageProvider>
        <AppFooter />
      </LanguageProvider>
    );

    const privacyLink = screen.getByText('Política de Privacidad');
    const termsLink = screen.getByText('Términos y Condiciones');

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();

  });
});
