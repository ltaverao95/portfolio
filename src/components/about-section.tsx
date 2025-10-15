"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SkillIcon } from "@/components/skill-icon";
import { useLanguage } from "@/context/language-context";
import { MicrosoftLogoIcon } from "./icons/microsoft-logo-icon";
import React from "react";

const iconComponents: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  microsoft: MicrosoftLogoIcon,
};

export function AboutSection() {
  const { translate } = useLanguage();
  const profileImage = PlaceHolderImages.find(
    (p) => p.id === "profile-picture"
  );

  const skills = {
    [translate("about.skills.backend") as string]: [
      ".NET Core",
      "ASP.NET",
      "C#",
      "Web API",
      "Entity Framework",
    ],
    [translate("about.skills.frontend") as string]: [
      "React",
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
    [translate("about.skills.databases") as string]: [
      "SQL Server",
      "PostgreSQL",
      "MongoDB",
    ],
    [translate("about.skills.principles") as string]: [
      "SOLID",
      "Clean Architecture",
      "DDD",
      "Microservicios",
    ],
    [translate("about.skills.tools") as string]: ["Git", "Docker", "Azure"],
  };

  const certificationItems = translate("about.certifications.items") as {
    title: string;
    issuer: string;
    iconKey: string;
  }[];

  return (
    <section id="sobre-mi" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:items-start">
          <div className="lg:w-2/3 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">
                {translate("about.title") as string}
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg text-justify">
                <p>{translate("about.paragraph1") as string}</p>
                <p>{translate("about.paragraph2") as string}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-headline text-primary">
                {translate("about.certifications.title") as string}
              </h3>
              <div className="space-y-4">
                {certificationItems.map(({ title, issuer, iconKey }, index) => {
                  const Icon = iconComponents[iconKey];
                  return (
                    <Card key={index} className="bg-secondary/50">
                      <CardContent className="p-6 flex items-center gap-4">
                        {Icon && <Icon className="w-10 h-10 shrink-0" />}
                        <div className="flex flex-col">
                          <h4 className="font-semibold text-lg text-primary">
                            {title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {issuer}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
          <h3 className="text-2xl font-bold font-headline tracking-tighter sm:text-3xl text-center text-primary mb-8">
            {translate("about.favoriteTools") as string}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 text-accent">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {items.map((skill) => (
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
