import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Ingeniero de Software',
    company: 'Flyr',
    dates: 'Actualidad',
    description: 'Desarrollo y mantenimiento de aplicaciones críticas para el sector aeronáutico, utilizando un stack tecnológico moderno basado en .Net y React. Colaboro en la definición de arquitecturas y en la implementación de nuevas funcionalidades, asegurando el rendimiento y la escalabilidad del sistema.'
  },
  {
    role: 'Desarrollador de Software',
    company: 'Newshore',
    dates: '2021 - 2022',
    description: 'Participé en el desarrollo de soluciones de software para aerolíneas, enfocado en sistemas de reservas y gestión de pasajeros. Implementé integraciones complejas y trabajé en la optimización de procesos clave del negocio.'
  },
  {
    role: 'Desarrollador',
    company: 'Universidad de Manizales',
    dates: '2019 - 2021',
    description: 'Contribuí al desarrollo de sistemas de información internos para la gestión académica y administrativa, mejorando la eficiencia de los procesos universitarios a través de la tecnología.'
  },
  {
    role: 'Desarrollador .Net',
    company: 'IT-ROI Solutions',
    dates: '2018 - 2019',
    description: 'Fui responsable del desarrollo de componentes y funcionalidades para productos de software de gestión de proyectos, trabajando principalmente con tecnologías .Net en un entorno ágil.'
  }
];

export function ExperienceSection() {
  return (
    <section id="experiencia" className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">Experiencia Profesional</h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-border" aria-hidden="true"></div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                <div className={`md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <p className="font-semibold text-accent">{exp.dates}</p>
                </div>
                <div className={`relative ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center md:left-1/2 md:-translate-x-1/2 md:-ml-[1px]">
                    <Briefcase className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <Card className="ml-8 md:ml-0">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{exp.role} en {exp.company}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{exp.description}</p>
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
