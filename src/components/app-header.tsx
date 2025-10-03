'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code2, LogOut, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';


export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const navLinks = [
    { href: translate('routes.home'), label: translate('header.home') },
    { href: translate('routes.about'), label: translate('header.about') },
    { href: translate('routes.experience'), label: translate('header.experience') },
    { href: translate('routes.projects'), label: translate('header.projects') },
    { href: translate('routes.contact'), label: translate('header.contact') },
    { href: translate('routes.codeAnalyzer'), label: translate('header.codeAnalyzer') },
    { href: user ? translate('routes.admin') : translate('routes.login'), label: translate('header.admin') },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href={translate('routes.home')} className="mr-6 flex items-center space-x-2">
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

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center space-x-2">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={translate('routes.codeAnalyzer')}>{navLinks[5].label}</Link>
            </Button>
            <ThemeToggleButton />
             { !isUserLoading && user && (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(translate('routes.admin') as string)}>
                      {translate('header.admin')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{translate('header.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             )}
             { !isUserLoading && !user && (
                <Button asChild variant="outline">
                    <Link href={translate('routes.login') as string}>{translate('header.admin')}</Link>
                </Button>
             )}
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
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <SheetDescription className="sr-only">A mobile menu with navigation links.</SheetDescription>
                </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                    <Link href={translate('routes.home')} className="flex items-center space-x-2" onClick={handleLinkClick}>
                        <Code2 className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Luis Felipe Tavera</span>
                    </Link>
                    <ThemeToggleButton />
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
                   { !isUserLoading && user && (
                     <Button onClick={handleLogout} variant="ghost" className="justify-start text-lg">
                        <LogOut className="mr-2 h-5 w-5" />
                        {translate('header.logout')}
                     </Button>
                   )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
