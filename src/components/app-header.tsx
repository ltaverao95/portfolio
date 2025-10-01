'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();

  const navLinks = [
    { href: '/#inicio', label: translate('header.home') },
    { href: '/#sobre-mi', label: translate('header.about') },
    { href: '/#experiencia', label: translate('header.experience') },
    { href: '/#proyectos', label: translate('header.projects') },
    { href: '/#contacto', label: translate('header.contact') },
    { href: '/analyzer', label: translate('header.codeAnalyzer') },
  ];


  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="#inicio" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Luis Felipe Tavera
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navLinks.slice(0, 5).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/analyzer">{navLinks[5].label}</Link>
            </Button>
          </nav>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                size="icon"
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                    <Link href="#inicio" className="flex items-center space-x-2" onClick={handleLinkClick}>
                        <Code2 className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Luis Felipe Tavera</span>
                    </Link>
                </div>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-lg transition-colors hover:text-accent"
                      onClick={handleLinkClick}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}