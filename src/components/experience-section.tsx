'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function ExperienceSection() {
  const { translate } = useLanguage();

  const experiences = [
    {
      role: translate('experience.job1.role'),
      company: 'Flyr',
      dates: translate('experience.job1.dates'),
      description: translate('experience.job1.description')
    },
    {
      role: translate('experience.job2.role'),
      company: 'Newshore',
      dates: '2019 - 2022',
      description: translate('experience.job2.description')
    },
    {
      role: translate('experience.job3.role'),
      company: 'Universidad de Manizales',
      dates: 'Nov 2018 - Dic 2018',
      description: translate('experience.job3.description')
    },
    {
      role: translate('experience.job4.role'),
      company: 'IT-ROI Solutions',
      dates: '2015 - 2018',
      description: translate('experience.job4.description')
    }
  ];

  return (
    <section id="experiencia" className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">{translate('experience.title')}</h2>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-border -translate-x-1/2" aria-hidden="true"></div>

          <div className="relative flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                  <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}>
                      <p className="font-semibold text-accent mt-1">{exp.dates}</p>
                  </div>
                  
                  <div className={`relative ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <Card className="w-full relative">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <CardTitle className="text-xl font-semibold">{exp.role} at {exp.company}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                              <p className="text-muted-foreground text-justify">{exp.description}</p>
                          </CardContent>
                      </Card>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}