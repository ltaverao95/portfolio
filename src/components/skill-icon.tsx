import { Code } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  '.NET Core': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#512BD4"/>
      <path d="M11 6h2v12h-2z" fill="#fff"/>
      <path d="M8 9h8v2H8zM8 13h8v2H8z" fill="#fff"/>
    </svg>
  ),
  'C#': (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor">
      <path d="M9.17 6.45c.4-.24.85-.38 1.34-.38 1.48 0 2.65.94 2.65 2.32 0 1.29-1.04 2.05-2.52 2.38l-1.47.33v-4.65zm.02 5.58v4.29c0 .41-.33.74-.74.74s-.74-.33-.74-.74V10.8l1.48-.33zM10.51 20c-2.11 0-3.83-1.63-3.83-3.83V7.93c0-.41.33-.74.74-.74s.74.33.74.74v.85c1.78-.65 3.73-.2 3.73 1.95 0 1.25-.8 2.2-2.12 2.53l1.8.4c1.6.35 2.62 1.4 2.62 2.94 0 2.2-1.74 4.13-4.58 4.13zm-.01-1.42c1.9 0 3.12-1.32 3.12-2.71 0-1.22-.9-2.1-2.43-2.42l-2.17-.48v5.61zm-1.47-7.79c.98 0 1.78-.6 1.78-1.57 0-1.02-.8-1.58-1.78-1.58-.46 0-.89.13-1.28.37v2.78zM15.5 12.5h2v-2h-2v2zm0 3h2v-2h-2v2zm-3-3h2v-2h-2v2zm0 3h2v-2h-2v2zm3-6h2v-2h-2v2zm0 3h2v-2h-2v2zm3-3h2v-2h-2v2zm0 3h2v-2h-2v2z" />
    </svg>
  ),
  'ASP.NET': <Code className="w-6 h-6" />,
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
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M12 2L2 6l1.2 10L12 22l8.8-6L22 6l-10-4z" fill="#DD0031" />
      <path d="M12 2v20l8.8-6L22 6l-10-4z" fill="#C3002F" />
      <path d="M12 11l-4 2 4 5 4-5-4-2z" fill="#FFFFFF" />
      <path d="M12 4L6 13h2.5l3.5-6.5 3.5 6.5H18L12 4z" fill="#FFFFFF" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path fill="#3178C6" d="M0 0h24v24H0z"/>
        <path fill="#FFF" d="M9.42 15.35V8.84h1.76l1.39 5.3h.05l1.4-5.3h1.76v6.5h-1.28v-4.5h-.05l-1.52 4.5h-1.2l-1.52-4.5h-.05v4.5z"/>
        <path fill="#FFF" d="M17.8 12.35c0 1.62-1.22 2.8-2.8 2.8s-2.8-1.18-2.8-2.8 1.22-2.78 2.8-2.78 2.8 1.16 2.8 2.78zm-4.33 0c0 .9.73 1.63 1.54 1.63s1.53-.73 1.53-1.63-.72-1.62-1.53-1.62-1.54.72-1.54 1.62z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path fill="#F7DF1E" d="M0 0h24v24H0z"/>
        <path d="M9.44 18.25c.34.52.89.81 1.62.81 1 0 1.52-.4 1.52-1.22 0-.61-.32-.9-1.61-1.28L9.7 16.1C8.2 15.68 7.3 14.71 7.3 13.04c0-1.8 1.4-3.08 3.65-3.08 1.59 0 2.7.59 3.52 1.93l-1.4.88c-.44-.81-1-1.2-1.92-1.2-.74 0-1.15.33-1.15.93 0 .52.28.77 1.32 1.15l1.27.46c1.86.68 2.65 1.54 2.65 3.02 0 2.1-1.62 3.33-4.1 3.33-2.1 0-3.46-.9-4.1-2.18l1.45-.88zM15.28 18.15c.52 0 .84-.31.98-.73h.05v.63h1.56v-7.9h-1.69v2.96c0 1.25-.19 1.95-1.01 1.95-.57 0-1-.4-1-1.26V10.1h-1.6v8.05h1.59v-.63c.27.46.6.73 1.23.73z"/>
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path fill="#E34F26" d="M2.5 21.3h19L20 2H4z"/>
        <path fill="#F16529" d="M12 4v16.5l8-2.2L20 4z"/>
        <path fill="#EBEBEB" d="M12 8v3h7l-.3 3.3-3.7 1-3-.8V8zM7.5 8h4.5v3H8.3l-.2 2.2H12v3l-3.3-.9L8.6 13h-3z"/>
        <path fill="#fff" d="M12 8v3H7.8l-.2-2.2H12zm0 5.3v-3H8.3l.1 1.2h3.6v1.8l3-.8.3-3.3H12v-3h7l-.5 5.5-3.5 1z"/>
    </svg>
  ),
  CSS3: <Code className="w-6 h-6" />,
  'SQL Server': (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M4 4h16v16H4z" fill="#A9A9A9"/>
        <path d="M5.5 5.5h13v13h-13z" fill="#CC2927"/>
        <path d="M10 8h2v8h-2z" fill="#fff"/>
        <path d="M13 8h2v8h-2z" fill="#fff"/>
        <path d="M8 10h8v2H8z" fill="#fff"/>
        <path d="M8 13h8v2H8z" fill="#fff"/>
        <path d="M11 7h5v1h-5z" fill="#F9F100"/>
        <path d="M11 16h5v1h-5z" fill="#F9F100"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M12.4,18.3h-2V9.6h2.1c1.3,0,2.4,0.3,3.2,1c0.8,0.7,1.2,1.6,1.2,2.8c0,1.3-0.5,2.4-1.4,3.2 C14.6,17.5,13.6,18.3,12.4,18.3z M12.4,11.3h-2v5.3h2c0.8,0,1.4-0.2,1.9-0.6c0.5-0.4,0.7-1,0.7-1.7c0-0.8-0.2-1.4-0.7-1.8 C13.9,11.5,13.2,11.3,12.4,11.3z" fill="#336791"/>
        <path d="M8.5,18.3H3.8V5.7h11.8v2.1H5.5v2.9h6.1v1.7H5.5v4.2h3V18.3z" fill="#336791"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M14.6 19.5c-3.2.9-6.2-.2-8-2.6-2.6-3.4-.9-8.4 3.4-9.8 1-.3 2.1-.4 3.1-.2.4.1.8.2 1.2.4 0-.1.1-.1.1-.2 1.4-2.3 3.5-3.3 6-3.1 1.2.1 2.3.6 3.1 1.3.4.3.7.7.9 1.1-.3.1-.6.3-.8.4-1.7 1.3-2.5 3.4-2 5.5.4 1.7 1.5 3.1 3 4 .3.2.7.3 1 .5-.1.5-.2 1-.4 1.4-1.6 3.1-5.1 4.3-8.6 3.3zm-3.2-3.8c-1.3-.4-2.4-1.3-3.1-2.4-.6-1.1-.8-2.4-.5-3.6.3-1.4 1.2-2.6 2.5-3.2.3-.2.7-.3 1-.4.2 2 .9 3.8 2.2 5.3 1.2 1.4 2.8 2.2 4.6 2.5-.7.9-1.6 1.6-2.7 2s-2.3.6-3.5.4l-.5-.1z" fill="#47A248"/>
    </svg>
  ),
  SOLID: <Code className="w-6 h-6" />,
  'Clean Architecture': <Code className="w-6 h-6" />,
  DDD: <Code className="w-6 h-6" />,
  Microservicios: <Code className="w-6 h-6" />,
  Git: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M22.2 9.6c-.2-.4-.7-.6-1.1-.6h-3.3c-.4 0-.8.2-1.1.6L12 15.3l-4.7-5.7c-.3-.4-.7-.6-1.1-.6H2.9c-.4 0-.9.2-1.1.6-.3.4-.3.9-.1 1.3l6.5 7.8c.3.3.7.5 1.1.5s.8-.2 1.1-.5l2.1-2.5v-3.7l4.3 5.2c.3.3.7.5 1.1.5s.8-.2 1.1-.5l3.4-4.1c.3-.4.3-.9.1-1.3zm-9.3 2.1l-1.1-1.4-2.5 3 3.6 4.3 3.6-4.3-2.5-3-1.1 1.4z" fill="#F05032"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M21.2,12.5c-0.1-0.2-0.2-0.3-0.4-0.4l-3-2c-0.4-0.2-0.8-0.2-1.2,0.1c-0.4,0.3-0.6,0.7-0.6,1.2v0.2h-3V7.1 c0-0.5-0.2-0.9-0.6-1.2c-0.4-0.3-0.8-0.3-1.2-0.1l-3,2C7.9,8,7.8,8.2,7.7,8.3" fill="#2496ED"/>
        <path d="M12.9,13.6h3v-0.2c0-0.5,0.2-0.9,0.6-1.2c0.4-0.3,0.8-0.3,1.2-0.1l3,2c0.2,0.1,0.3,0.2,0.4,0.4 c0.1,0.2,0.2,0.4,0.1,0.6l-1.2,5.2c-0.2,0.8-0.9,1.3-1.7,1.3h-4.3c-0.6,0-1-0.4-1-1v-6C11.9,14,12.3,13.6,12.9,13.6z" fill="#2496ED"/>
        <path d="M11.9,7.1v3.5H9.4V7.1c0-0.5-0.2-0.9-0.6-1.2C8.4,5.6,8,5.6,7.6,5.8l-3,2C4.4,8,4.3,8.2,4.2,8.3 c-0.1,0.2-0.2,0.4-0.1,0.6l1.2,5.2c0.2,0.8,0.9,1.3,1.7,1.3h4.3c0.6,0,1-0.4,1-1v-7.2C12.3,7.1,11.9,7.1,11.9,7.1z" fill="#2496ED"/>
        <rect x="2" y="3" width="10" height="2" rx="1" fill="#2496ED"/>
        <rect x="5" y="6" width="2" height="2" rx="1" fill="#2496ED"/>
        <rect x="8" y="6" width="2" height="2" rx="1" fill="#2496ED"/>
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M12.1 2.2L4 7.8l6.5 13.9 7.6-3.6c.4-.2.7-.5.9-.9L22 7.7l-9.9-5.5z" fill="#0078D4"/>
        <path d="M4 7.8v8.4l6.5 5.5V13.8L4 7.8z" fill="#5E92C3"/>
    </svg>
  ),
  Jenkins: <Code className="w-6 h-6" />,
};

export function SkillIcon({ name }: { name: string }) {
  const icon = iconMap[name] || <Code className="w-6 h-6" />;
  return <div className="text-primary">{icon}</div>;
}
