import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="inicio" className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                Hola, soy Luis Felipe Tavera Orozco
              </h1>
              <h2 className="font-headline text-2xl font-semibold text-accent md:text-3xl">
                Ingeniero de Software Senior
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Con más de 8 años de experiencia construyendo soluciones de software robustas, escalables y eficientes. Mi pasión es transformar ideas complejas en aplicaciones intuitivas y potentes utilizando tecnologías como .Net, React y Angular.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="#contacto">Contactar</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#proyectos">
                  Ver mis proyectos <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
