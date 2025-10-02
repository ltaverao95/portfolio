import { Code } from 'lucide-react';
import Image from 'next/image';

const iconMap: Record<string, JSX.Element> = {
  '.NET Core': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#512BD4"/>
      <path d="M11 6h2v12h-2z" fill="#fff"/>
      <path d="M8 9h8v2H8zM8 13h8v2H8z" fill="#fff"/>
    </svg>
  ),
  'C#': (
    <Image src="/assets/icons/c-sharp-icon.svg" alt="C#" width={24} height={24} className="w-6 h-6" />
  ),
  'ASP.NET': (
    <Image src="/assets/icons/aspnet-icon.svg" alt="ASP.NET" width={24} height={24} className="w-6 h-6" />
  ),
  'Web API': <Code className="w-6 h-6" />,
  'Entity Framework': <Code className="w-6 h-6" />,
  React: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5"/>
    </svg>
  ),
  Angular: (
    <Image src="/assets/icons/angular-icon.svg" alt="Angular" width={24} height={24} className="w-6 h-6" />
  ),
  TypeScript: (
    <Image src="/assets/icons/typescript-icon.svg" alt="TypeScript" width={24} height={24} className="w-6 h-6" />
  ),
  // TypeScript: (
  //   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
  //       <path fill="#3178C6" d="M0 0h24v24H0z"/>
  //       <path fill="#FFF" d="M9.42 15.35V8.84h1.76l1.39 5.3h.05l1.4-5.3h1.76v6.5h-1.28v-4.5h-.05l-1.52 4.5h-1.2l-1.52-4.5h-.05v4.5z"/>
  //       <path fill="#FFF" d="M17.8 12.35c0 1.62-1.22 2.8-2.8 2.8s-2.8-1.18-2.8-2.8 1.22-2.78 2.8-2.78 2.8 1.16 2.8 2.78zm-4.33 0c0 .9.73 1.63 1.54 1.63s1.53-.73 1.53-1.63-.72-1.62-1.53-1.62-1.54.72-1.54 1.62z"/>
  //   </svg>
  // ),
  JavaScript: (
    <Image src="/assets/icons/javascript-icon.svg" alt="JavaScript" width={24} height={24} className="w-6 h-6" />
  ),
  HTML5: (
    <Image src="/assets/icons/html5-icon.svg" alt="HTML5" width={24} height={24} className="w-6 h-6" />
  ),
  CSS3: (
    <Image src="/assets/icons/css3-icon.svg" alt="CSS3" width={24} height={24} className="w-6 h-6" />
  ),
  'SQL Server': (
    <Image src="/assets/icons/sqlserver-icon.svg" alt="SQL Server" width={24} height={24} className="w-6 h-6" />
  ),
  PostgreSQL: (
    <Image src="/assets/icons/postgresql-icon.svg" alt="PostgreSQL" width={24} height={24} className="w-6 h-6" />
  ),
  MongoDB: (
    <Image src="/assets/icons/mongodb-icon.svg" alt="MongoDB" width={24} height={24} className="w-6 h-6" />
  ),
  SOLID: <Code className="w-6 h-6" />,
  'Clean Architecture': <Code className="w-6 h-6" />,
  DDD: <Code className="w-6 h-6" />,
  Microservicios: (
    <Image src="/assets/icons/microservices-icon.svg" alt="Microservices" width={24} height={24} className="w-6 h-6" />
  ),
  Git: (
    <Image src="/assets/icons/git-icon.svg" alt="Git" width={24} height={24} className="w-6 h-6" />
  ),
  Docker: (
    <Image src="/assets/icons/docker-icon.svg" alt="Docker" width={24} height={24} className="w-6 h-6" />
  ),
  Azure: (
    <Image src="/assets/icons/azure-icon.svg" alt="Azure" width={24} height={24} className="w-6 h-6" />
  )
};

export function SkillIcon({ name }: { name: string }) {
  const icon = iconMap[name] || <Code className="w-6 h-6" />;
  return <div className="text-primary">{icon}</div>;
}
