'use client';

import Link from 'next/link';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function ContactSection() {
  const { translate } = useLanguage();
  const contactInfo = [
    {
      icon: Mail,
      text: 'felipetavera0412@gmail.com',
      href: 'mailto:felipetavera0412@gmail.com',
    },
    {
      icon: Linkedin,
      text: 'linkedin.com/in/luis-felipe-tavera-orozco',
      href: 'https://www.linkedin.com/in/luis-felipe-tavera-orozco/',
    },
    {
      icon: Github,
      text: 'github.com/ltaverao95',
      href: 'https://github.com/ltaverao95',
    },
  ];

  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">{translate('contact.title')}</h2>
            <p className="text-muted-foreground text-lg">
              {translate('contact.description')}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 pt-4">
            {contactInfo.map(({ icon: Icon, text, href }, index) => (
              <Button asChild key={index} variant="link" className="text-lg text-foreground hover:text-accent">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="mr-3 h-5 w-5" />
                  {text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}