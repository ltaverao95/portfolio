'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function HeroSection() {
  const { translate } = useLanguage();

  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                {translate('hero.greeting') as string}
              </h1>
              <h2 className="font-headline text-2xl font-semibold text-accent md:text-3xl">
                {translate('hero.role') as string}
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                {translate('hero.description') as string}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href={translate("routes.contact") as string}>{translate('hero.contactButton') as string}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={translate("routes.projects") as string}>
                  {translate('hero.projectsButton') as string} <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}