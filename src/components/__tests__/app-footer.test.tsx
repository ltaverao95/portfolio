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

    const privacyLink = screen.getByText('Privacy Policy');
    const termsLink = screen.getByText('Terms and Conditions');

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms-and-conditions');
  });
});
