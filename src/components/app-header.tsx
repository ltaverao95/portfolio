'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code2, LogOut, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';


export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { translate } = useLanguage();
  const router = useRouter();

  const navLinks = [
    { href: translate('routes.home') as string, label: translate('header.home') as string },
    { href: translate('routes.about') as string, label: translate('header.about') as string },
    { href: translate('routes.experience') as string, label: translate('header.experience') as string },
    { href: translate('routes.projects') as string, label: translate('header.projects') as string },
    { href: translate('routes.contact') as string, label: translate('header.contact') as string },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href={translate('routes.home') as string} className="mr-6 flex items-center space-x-2">
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
                      {translate('header.admin') as string}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{translate('header.logout') as string}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    <Link href={translate('routes.home') as string} className="flex items-center space-x-2" onClick={handleLinkClick}>
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
                        {translate('header.logout') as string}
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
