"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export function ProjectsSection() {
  const { translate } = useLanguage();

  const projects = [
    {
      title: "Portfolio",
      description: translate("projects.items.portfolio.description") as string,
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
      ],
      link: "https://github.com/ltaverao95/portfolio",
    },
    {
      title: "FaceRecognition.API",
      description: translate(
        "projects.items.faceRecognitionApi.description"
      ) as string,
      technologies: [
        ".NET Core",
        "ASP.NET Web API",
        "Azure Cognitive Services",
        "C#",
      ],
      link: "https://github.com/ltaverao95/FaceRecognition.API",
    },
    {
      title: "Google Chrome APIs Extension",
      description: translate(
        "projects.items.chromeExtension.description"
      ) as string,
      technologies: ["JavaScript", "HTML5", "CSS3", "Chrome Extension APIs"],
      link: "https://github.com/ltaverao95/google_chrome_apis",
    },
    {
      title: "Telegram ChatBot Hackaton - Kodefest",
      description: translate(
        "projects.items.bankSimulator.description"
      ) as string,
      technologies: ["JavaScript", "HTML5", "CSS3", "Node.js"],
      link: "https://github.com/ltaverao95/kodefest8",
    },
  ];
  return (
    <section id="proyectos" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">
            {translate("projects.title") as string}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-justify">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={project.link}
                    target="_blank"
                    onClick={() => {
                      sendGAEvent("event", "buttonProjectClicked", {
                        value: "view_on_github",
                        project: project.title,
                      });
                      sendGTMEvent({
                        event: "buttonProjectClicked",
                        value: "view_on_github",
                        project: project.title,
                      });
                    }}
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {translate("projects.viewOnGithub") as string}
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
