import { Code } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  '.NET Core': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
      <path d="M11 6h2v12h-2z" fill="currentColor"/>
      <path d="M8 9h8v2H8zM8 13h8v2H8z" fill="currentColor"/>
    </svg>
  ),
  'C#': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M14.5 6.5l-5 11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17.5 9.5l-5 11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8.5 8H10m4.5 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 16h1.5m4.5-8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'ASP.NET': <Code className="w-6 h-6" />,
  'Web API': <Code className="w-6 h-6" />,
  'Entity Framework': <Code className="w-6 h-6" />,
  React: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Angular: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M12 2L2 6l1.2 10L12 22l8.8-6L22 6l-10-4z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2L2 6l1.2 10L12 22l8.8-6L22 6l-10-4z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <path d="M12 11l-4 2 4 5 4-5-4-2z" fill="currentColor" fillOpacity="0.5"/>
      <path d="M12 4L6 13h2.5l3.5-6.5 3.5 6.5H18L12 4z" fill="currentColor"/>
    </svg>
  ),
  TypeScript: <Code className="w-6 h-6" />,
  JavaScript: <Code className="w-6 h-6" />,
  HTML5: <Code className="w-6 h-6" />,
  CSS3: <Code className="w-6 h-6" />,
  'SQL Server': <Code className="w-6 h-6" />,
  PostgreSQL: <Code className="w-6 h-6" />,
  MongoDB: <Code className="w-6 h-6" />,
  SOLID: <Code className="w-6 h-6" />,
  'Clean Architecture': <Code className="w-6 h-6" />,
  DDD: <Code className="w-6 h-6" />,
  Microservicios: <Code className="w-6 h-6" />,
  Git: <Code className="w-6 h-6" />,
  Docker: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M21.2,12.5c-0.1-0.2-0.2-0.3-0.4-0.4l-3-2c-0.4-0.2-0.8-0.2-1.2,0.1c-0.4,0.3-0.6,0.7-0.6,1.2v0.2h-3V7.1 c0-0.5-0.2-0.9-0.6-1.2c-0.4-0.3-0.8-0.3-1.2-0.1l-3,2C7.9,8,7.8,8.2,7.7,8.3" fill="currentColor"/>
        <path d="M12.9,13.6h3v-0.2c0-0.5,0.2-0.9,0.6-1.2c0.4-0.3,0.8-0.3,1.2-0.1l3,2c0.2,0.1,0.3,0.2,0.4,0.4 c0.1,0.2,0.2,0.4,0.1,0.6l-1.2,5.2c-0.2,0.8-0.9,1.3-1.7,1.3h-4.3c-0.6,0-1-0.4-1-1v-6C11.9,14,12.3,13.6,12.9,13.6z" fill="currentColor"/>
        <path d="M11.9,7.1v3.5H9.4V7.1c0-0.5-0.2-0.9-0.6-1.2C8.4,5.6,8,5.6,7.6,5.8l-3,2C4.4,8,4.3,8.2,4.2,8.3 c-0.1,0.2-0.2,0.4-0.1,0.6l1.2,5.2c0.2,0.8,0.9,1.3,1.7,1.3h4.3c0.6,0,1-0.4,1-1v-7.2C12.3,7.1,11.9,7.1,11.9,7.1z" fill="currentColor"/>
        <rect x="2" y="3" width="10" height="2" rx="1" fill="currentColor"/>
        <rect x="5" y="6" width="2" height="2" rx="1" fill="currentColor"/>
        <rect x="8" y="6" width="2" height="2" rx="1" fill="currentColor"/>
    </svg>
  ),
  Azure: <Code className="w-6 h-6" />,
  Jenkins: <Code className="w-6 h-6" />,
};

export function SkillIcon({ name }: { name: string }) {
  const icon = iconMap[name] || <Code className="w-6 h-6" />;
  return <div className="text-primary">{icon}</div>;
}
