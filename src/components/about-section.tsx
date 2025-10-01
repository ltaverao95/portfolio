import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SkillIcon } from '@/components/skill-icon';

const skills = {
  Backend: ['.NET Core', 'ASP.NET', 'C#', 'Web API', 'Entity Framework'],
  Frontend: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  'Bases de Datos': ['SQL Server', 'PostgreSQL', 'MongoDB'],
  'Principios y Arquitecturas': ['SOLID', 'Clean Architecture', 'DDD', 'Microservicios'],
  Herramientas: ['Git', 'Docker', 'Azure', 'Jenkins'],
};

export function AboutSection() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section id="sobre-mi" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">Sobre Mí</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Soy un desarrollador enfocado en la calidad y las buenas prácticas. Creo firmemente que un buen software no solo debe funcionar, sino que debe ser mantenible y escalable. Por eso, aplico patrones de diseño, arquitecturas limpias y los principios SOLID en cada proyecto que lidero o en el que participo. Mi objetivo es siempre entregar valor real a través de código limpio y bien estructurado.
                </p>
                <p>
                  Me considero un eterno aprendiz, siempre explorando nuevas tecnologías y metodologías para mejorar mis habilidades. Disfruto de los desafíos técnicos y de colaborar en equipos dinámicos para alcanzar objetivos comunes. Actualmente, aporto mi experiencia en el equipo de Flyr, donde contribuyo al desarrollo de soluciones innovadoras.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={300}
                height={300}
                className="rounded-full aspect-square object-cover shadow-lg border-4 border-card"
              />
            )}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold font-headline tracking-tighter sm:text-3xl text-center text-primary mb-8">Mis Herramientas Favoritas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 text-accent">{category}</h4>
                  <ul className="space-y-3">
                    {items.map(skill => (
                      <li key={skill} className="flex items-center gap-3">
                        <SkillIcon name={skill} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
