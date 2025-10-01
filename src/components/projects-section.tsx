import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'FaceRecognition.API',
    description: 'Una API RESTful desarrollada en .NET Core que integra servicios de reconocimiento facial de Microsoft Azure. Permite gestionar, entrenar y reconocer rostros a través de endpoints seguros y eficientes.',
    technologies: ['.NET Core', 'ASP.NET Web API', 'Azure Cognitive Services', 'C#'],
    link: 'https://github.com/ltaverao95/FaceRecognition.API'
  },
  {
    title: 'Google Chrome APIs Extension',
    description: 'Un proyecto personal para explorar el poder de las APIs de Google Chrome. Esta extensión demuestra cómo interactuar con las funcionalidades nativas del navegador, como la gestión de pestañas, almacenamiento y notificaciones.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Chrome Extension APIs'],
    link: 'https://github.com/ltaverao95/Google-Chrome-APIs-Extension'
  }
];

export function ProjectsSection() {
  return (
    <section id="proyectos" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">Proyectos que me enorgullecen</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Ver en GitHub
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
